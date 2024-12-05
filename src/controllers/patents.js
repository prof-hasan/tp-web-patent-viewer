const { Op } = require("sequelize");
const { param, query } = require("express-validator");

const models = require("../database/models");
const { validateRequest, isFullDate } = require("../utils/http-validation");

class Statistics {
	constructor () {
		this.validations = {
			filter: [
				query("end", "Data final inválida. Por favor utilize o formato YYYY-MM-DD.").custom(isFullDate),
				query("start", "Data inicial inválida. Por favor utilize o formato YYYY-MM-DD.").custom(isFullDate),
				query("code", "Código inválido").optional().isString(),
				query("holder", "Titular inválido").optional().isString(),
				query("inventor", "Inventor ou criador inválido").optional().isString(),
				query("status", "O filtro de status deveria ser um array").optional().isArray(),
				query("status.*", "Status inválido").optional().isIn(Object.values(models.StatusPatente)),
				query("title", "Título inválido").optional().isString(),
				query("type", "Tipo de patente inválido").optional().isIn(Object.values(models.TipoPatente)),
				validateRequest
			],
			details: [
				param("code", "Código inválido para a patente ou programa").isString(),
				validateRequest
			]
		};
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async filter (req, res) {
		try {
			const where = {
				dataDeposito: {
					[Op.between]: [req.query.start, req.query.end]
				}
			};

			const include = [];

			if (req.query.code)
				where.codigo = { [Op.iLike]: `%${req.query.code}%` };

			if (req.query.status)
				where.status = { [Op.in]: req.query.status };

			if (req.query.title)
				where.nome = { [Op.iLike]: `%${req.query.title}%` };

			if (req.query.type)
				where.tipo = req.query.type;

			if (req.query.holder) {
				include.push({
					association: "titulares",
					attributes: [],
					through: { attributes: [] },
					where: { nomeVisualizacao: { [Op.iLike]: `%${req.query.holder}%` } },
					required: true
				});
			}

			if (req.query.inventor) {
				include.push({
					association: "inventores",
					attributes: [],
					through: { attributes: [] },
					where: { nomeVisualizacao: { [Op.iLike]: `%${req.query.inventor}%` } },
					required: true
				});
			}

			const results = await models.Patentes.findAll({
				attributes: ["codigo", "nome", "dataDeposito", "tipo", "status", "linguagens"],
				include,
				where,
				raw: true
			});

			for (const row of results) {
				if (row.tipo === models.TipoPatente.PATENTE)
					delete row.linguagens;
				else
					row.linguagens = row.linguagens.split(",");
			}

			res.status(200).json(results);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter as patentes ou programas.", error });
		}
	}

	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async details (req, res) {
		try {
			const result = await models.Patentes.findOne({
				attributes: ["codigo", "nome", "dataDeposito", "resumo", "status", "tipo", "linguagens"],
				include: [{
					association: "inventores",
					attributes: ["nomeVisualizacao"],
					through: { attributes: [] },
					required: false
				}, {
					association: "titulares",
					attributes: ["nomeVisualizacao"],
					through: { attributes: [] },
					required: false
				}, {
					association: "despachosPatente",
					attributes: ["sequencia", "comentario"],
					required: false,
					include: [{
						association: "despacho",
						attributes: ["codigo", "titulo"],
						required: true
					}, {
						association: "revista",
						attributes: ["numRevista", "dataPublicacao"],
						required: true
					}]
				}],
				where: { codigo: req.params.code }
			});

			if (!result)
				return res.status(404).json({ message: "Patente ou programa não encontrado." });

			const patent = result.toJSON();
			patent.inventores = patent.inventores.map(i => i.nomeVisualizacao).sort();
			patent.titulares = patent.titulares.map(t => t.nomeVisualizacao).sort();
			patent.despachosPatente.sort((a, b) => a.sequencia - b.sequencia);

			if (patent.tipo === models.TipoPatente.PATENTE)
				delete patent.linguagens;
			else
				patent.linguagens = patent.linguagens.split(",");

			res.status(200).json(patent);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Não foi possível obter os detalhes da patente ou programa.", error });
		}
	}
}

const statisticsController = new Statistics();
module.exports = statisticsController;
