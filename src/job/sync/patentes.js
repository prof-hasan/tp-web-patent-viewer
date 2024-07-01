const { Op } = require("sequelize");
const models = require("../../database/models");

const { SyncDespachos } = require("./despacho");
const { SyncInventores } = require("./inventores");
const { SyncRevistas } = require("./revistas");
const { SyncTitulares } = require("./titulares");

class SyncPatentes {
	_despachos;
	_inventores;
	_revistas;
	_titulares;
	_transaction;

	constructor (transaction) {
		this._despachos = new SyncDespachos(transaction);
		this._inventores = new SyncInventores(transaction);
		this._revistas = new SyncRevistas(transaction);
		this._titulares = new SyncTitulares(transaction);
		this._transaction = transaction;
	}

	async create (patente) {
		const inventores = [];
		const titulares = [];
		const despachos = [];

		for (const inventor of patente.inventores) {
			const idInventor = await this._inventores.findOrCreate(inventor);
			inventores.push({
				idInventor,
				codigoPatente: patente.codigo
			});
		}

		for (const titular of patente.titulares) {
			const idTitular = await this._titulares.findOrCreate(titular);
			titulares.push({
				idTitular,
				codigoPatente: patente.codigo
			});
		}

		for (const dp of patente.despachos) {
			const codigoDespacho = await this._despachos.findOrCreate(
				dp.despacho.codigo, dp.despacho.titulo
			);

			const numRevista = await this._revistas.findOrCreate(
				dp.revista.numRevista, dp.revista.dataPublicacao
			);

			despachos.push({
				codigoDespacho,
				codigoPatente: patente.codigo,
				numRevista,
				sequencia: dp.sequencia,
				comentario: dp.comentario
			});
		}

		await models.Patentes.create({
			codigo: patente.codigo,
			nome: patente.nome,
			dataDeposito: patente.dataDeposito,
			resumo: patente.resumo,
			status: patente.status,
			tipo: "linguagens" in patente ? models.TipoPatente.PROGRAMA : models.TipoPatente.PATENTE,
			linguagens: patente.linguagens || null
		}, { transaction: this._transaction });

		await Promise.all([
			models.InventoresPatentes.bulkCreate(inventores, { transaction: this._transaction }),
			models.TitularesPatentes.bulkCreate(titulares, { transaction: this._transaction }),
			models.DespachosPatentes.bulkCreate(despachos, { transaction: this._transaction })
		]);
	}

	async destroy (patente) {
		await Promise.all([
			models.InventoresPatentes.destroy({
				where: { codigoPatente: patente.codigo },
				transaction: this._transaction
			}),
			models.TitularesPatentes.destroy({
				where: { codigoPatente: patente.codigo },
				transaction: this._transaction
			}),
			models.DespachosPatentes.destroy({
				where: { codigoPatente: patente.codigo },
				transaction: this._transaction
			})
		]);

		await models.Patentes.destroy({
			where: { codigo: patente.codigo },
			transaction: this._transaction
		});
	}

	async update (patente) {
		let updated = false;

		const despachos = { add: [], remove: [] };
		const inventores = { add: [], remove: [] };
		const titulares = { add: [], remove: [] };
		const changedAttributes = {};

		// Atualização da tabela patentes
		if (typeof patente.nome === "object" && "__new" in patente.nome)
			changedAttributes.nome = patente.nome.__new;

		if (typeof patente.dataDeposito === "object" && "__new" in patente.dataDeposito)
			changedAttributes.dataDeposito = patente.dataDeposito.__new;

		if (typeof patente.resumo === "object" && "__new" in patente.resumo)
			changedAttributes.resumo = patente.resumo.__new;

		if (typeof patente.status === "object" && "__new" in patente.status)
			changedAttributes.status = patente.status.__new;

		if ("linguagens__deleted" in patente) {
			changedAttributes.linguagens = null;
			changedAttributes.tipo = models.TipoPatente.PATENTE;
		} else if ("linguagens__added" in patente) {
			changedAttributes.linguagens = patente.linguagens__added;
			changedAttributes.tipo = models.TipoPatente.PROGRAMA;
		} else if (typeof patente.linguagens === "object" && "__new" in patente.linguagens) {
			changedAttributes.linguagens = patente.linguagens.__new;
			if (changedAttributes.linguagens)
				changedAttributes.tipo = models.TipoPatente.PROGRAMA;
			else
				changedAttributes.tipo = models.TipoPatente.PATENTE;
		}

		if (Object.keys(changedAttributes).length > 0) {
			updated = true;
			await models.Patentes.update(changedAttributes, {
				where: { codigo: patente.codigo },
				transaction: this._transaction
			});
		}

		// Atualização dos inventores
		if (Array.isArray(patente.inventores[0])) {
			for (const [diff, inventor] of patente.inventores) {
				if (diff === "+") {
					const idInventor = await this._inventores.findOrCreate(inventor);
					inventores.add.push({
						idInventor,
						codigoPatente: patente.codigo
					});
				} else if (diff === "-") {
					const idInventor = await this._inventores.find(inventor);
					if (idInventor)
						inventores.remove.push(idInventor);
				}
			}
		}

		if (inventores.add.length) {
			updated = true;
			await models.InventoresPatentes.bulkCreate(inventores.add, { transaction: this._transaction });
		}

		if (inventores.remove.length) {
			updated = true;
			await models.InventoresPatentes.destroy({
				where: {
					codigoPatente: patente.codigo,
					idInventor: inventores.remove
				},
				transaction: this._transaction
			});
		}

		// Atualização dos titulares
		if (Array.isArray(patente.titulares[0])) {
			for (const [diff, titular] of patente.titulares) {
				if (diff === "+") {
					const idTitular = await this._titulares.findOrCreate(titular);
					titulares.add.push({
						idTitular,
						codigoPatente: patente.codigo
					});
				} else if (diff === "-") {
					const idTitular = await this._titulares.find(titular);
					if (idTitular)
						titulares.remove.push(idTitular);
				}
			}
		}

		if (titulares.add.length) {
			updated = true;
			await models.TitularesPatentes.bulkCreate(titulares.add, { transaction: this._transaction });
		}

		if (titulares.remove.length) {
			updated = true;
			await models.TitularesPatentes.destroy({
				where: {
					codigoPatente: patente.codigo,
					idTitular: titulares.remove
				},
				transaction: this._transaction
			});
		}

		// Atualização dos despachos
		if (Array.isArray(patente.despachos[0])) {
			for (const [diff, dp] of patente.despachos) {
				if (diff === "+") {
					const codigoDespacho = await this._despachos.findOrCreate(
						dp.despacho.codigo, dp.despacho.titulo
					);

					const numRevista = await this._revistas.findOrCreate(
						dp.revista.numRevista, dp.revista.dataPublicacao
					);

					despachos.add.push({
						codigoDespacho,
						codigoPatente: patente.codigo,
						numRevista,
						sequencia: dp.sequencia,
						comentario: dp.comentario
					});
				} else if (diff === "-") {
					despachos.remove.push({
						codigoDespacho: dp.despacho.codigo,
						sequencia: dp.sequencia
					});
				} else if (diff === "~") {
					const changedColumns = {};
					const where = { codigoPatente: patente.codigo };

					if (typeof dp.sequencia === "object" && "__new" in dp.sequencia) {
						changedColumns.sequencia = dp.sequencia.__new;
						where.sequencia = dp.sequencia.__old;
					} else {
						where.sequencia = dp.sequencia;
					}

					if (typeof dp.comentario === "object" && "__new" in dp.comentario)
						changedColumns.comentario = dp.comentario.__new;

					if (typeof dp.despacho.codigo === "object" && "__new" in dp.despacho.codigo) {
						let titulo = dp.despacho.titulo;
						if (typeof dp.despacho.titulo === "object" && "__new" in dp.despacho.titulo)
							titulo = dp.despacho.titulo.__new;

						const codigoDespacho = await this._despachos.findOrCreate(
							dp.despacho.codigo.__new, titulo
						);

						changedColumns.codigoDespacho = codigoDespacho;
						where.codigoDespacho = dp.despacho.codigo.__old;
					} else {
						where.codigoDespacho = dp.despacho.codigo;
					}

					if (typeof dp.revista.numRevista === "object" && "__new" in dp.revista.numRevista) {
						let dataPublicacao = dp.revista.dataPublicacao;
						if (typeof dp.revista.dataPublicacao === "object" && "__new" in dp.revista.dataPublicacao)
							dataPublicacao = dp.revista.dataPublicacao.__new;

						const numRevista = await this._revistas.findOrCreate(
							dp.revista.numRevista.__new, dataPublicacao
						);

						changedColumns.numRevista = numRevista;
					}

					if (Object.keys(changedColumns).length > 0) {
						updated = true;
						await models.DespachosPatentes.update(changedColumns, {
							where,
							transaction: this._transaction
						});
					}
				}
			}
		}

		if (despachos.add.length) {
			updated = true;
			await models.DespachosPatentes.bulkCreate(despachos.add, { transaction: this._transaction });
		}

		if (despachos.remove.length) {
			updated = true;
			await models.DespachosPatentes.destroy({
				where: {
					codigoPatente: patente.codigo,
					[Op.or]: despachos.remove
				},
				transaction: this._transaction
			});
		}

		return updated;
	}
}

module.exports = { SyncPatentes };
