const { param } = require("express-validator");

const models = require("../database/models");
const { validateRequest } = require("../utils/http-validation");

class Statistics {
	constructor () {
		this.validations = {
			requestsByPeriod: [
				param("period", "Período inválido").isIn(["yearly", "monthly"]),
				validateRequest
			],
			topInventors: [
				param("size", "Tamanho do ranking inválido").isInt({ min: 1 }).toInt(),
				validateRequest
			],
			topHolders: [
				param("size", "Tamanho do ranking inválido").isInt({ min: 1 }).toInt(),
				validateRequest
			],
			recentRequests: [
				param("size", "Tamanho da lista inválido").isInt({ min: 1 }).toInt(),
				validateRequest
			]
		};
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async status (req, res) {
		try {
			const results = await models.Patentes.findAll({
				attributes: ["tipo", "status", [models.sequelize.fn("COUNT", models.sequelize.literal("*")), "count"]],
				group: ["tipo", "status"],
				raw: true
			});

			const stats = {
				[models.TipoPatente.PATENTE]: {
					[models.StatusPatente.ARQUIVADO]: 0,
					[models.StatusPatente.CONCEDIDO]: 0,
					[models.StatusPatente.EM_ANDAMENTO]: 0
				},
				[models.TipoPatente.PROGRAMA]: {
					[models.StatusPatente.ARQUIVADO]: 0,
					[models.StatusPatente.CONCEDIDO]: 0,
					[models.StatusPatente.EM_ANDAMENTO]: 0
				}
			};

			for (const row of results)
				stats[row.tipo][row.status] = Number(row.count);

			res.status(200).json(stats);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter as estatísticas por status.", error });
		}
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async requestsByPeriod (req, res) {
		try {
			const format = req.params.period === "yearly" ? "YYYY" : "YYYY-MM";
			const results = await models.Patentes.findAll({
				attributes: [
					"tipo",
					[models.sequelize.fn("TO_CHAR", models.sequelize.col("data_deposito"), format), "periodo"],
					[models.sequelize.fn("COUNT", models.sequelize.literal("*")), "count"]
				],
				group: ["tipo", "periodo"],
				order: [["periodo", "ASC"]],
				raw: true
			});

			const stats = {
				[models.TipoPatente.PATENTE]: [],
				[models.TipoPatente.PROGRAMA]: []
			};

			for (const row of results)
				stats[row.tipo].push({ periodo: row.periodo, quantidade: Number(row.count) });

			res.status(200).json(stats);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter as solicitações por período.", error });
		}
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async topInventors (req, res) {
		try {
			const results = await models.sequelize.query(
				`SELECT
					I.nome_visualizacao AS "nomeVisualizacao",
					COUNT(*) AS "citacoes",
					SUM(CASE WHEN P.tipo = 'PATENTE' THEN 1 ELSE 0 END) AS "qtdPatentes",
					SUM(CASE WHEN P.tipo = 'PROGRAMA' THEN 1 ELSE 0 END) AS "qtdProgramas"
				FROM patentes AS P
				INNER JOIN inventores_patentes IP ON IP.codigo_patente = P.codigo AND IP.deleted_at IS NULL
				INNER JOIN inventores I ON I.id_inventor = IP.id_inventor AND I.deleted_at IS NULL
				WHERE P.deleted_at IS NULL
				GROUP BY I.nome_visualizacao
				ORDER BY "citacoes" DESC, I.nome_visualizacao ASC
				LIMIT ${req.params.size};`,
				{ type: models.sequelize.QueryTypes.SELECT }
			);

			for (const row of results) {
				row.citacoes = Number(row.citacoes);
				row.qtdPatentes = Number(row.qtdPatentes);
				row.qtdProgramas = Number(row.qtdProgramas);
			}

			res.status(200).json(results);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter os ranking de inventores.", error });
		}
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async topHolders (req, res) {
		try {
			const results = await models.sequelize.query(
				`SELECT
					T.nome_visualizacao AS "nomeVisualizacao",
					COUNT(*) AS "citacoes",
					SUM(CASE WHEN P.tipo = 'PATENTE' THEN 1 ELSE 0 END) AS "qtdPatentes",
					SUM(CASE WHEN P.tipo = 'PROGRAMA' THEN 1 ELSE 0 END) AS "qtdProgramas"
				FROM patentes AS P
				INNER JOIN titulares_patentes TP ON TP.codigo_patente = P.codigo AND TP.deleted_at IS NULL
				INNER JOIN titulares T ON T.id_titular = TP.id_titular AND T.deleted_at IS NULL
				WHERE P.deleted_at IS NULL
				GROUP BY T.nome_visualizacao
				ORDER BY "citacoes" DESC, T.nome_visualizacao ASC
				LIMIT ${req.params.size};`,
				{ type: models.sequelize.QueryTypes.SELECT }
			);

			for (const row of results) {
				row.citacoes = Number(row.citacoes);
				row.qtdPatentes = Number(row.qtdPatentes);
				row.qtdProgramas = Number(row.qtdProgramas);
			}

			res.status(200).json(results);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter os ranking de titulares.", error });
		}
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async recentRequests (req, res) {
		try {
			const results = await models.Patentes.findAll({
				attributes: ["codigo", "nome", "dataDeposito", "status", "tipo"],
				order: [["dataDeposito", "DESC"]],
				limit: req.params.size,
				raw: true
			});
			res.status(200).json(results);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter as solicitações mais recentes.", error });
		}
	}
}

const statisticsController = new Statistics();
module.exports = statisticsController;
