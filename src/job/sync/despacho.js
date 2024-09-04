const dayjs = require("dayjs");

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const models = require("../../database/models");

class SyncDespachos {
	_despachos;
	_despachosLoaded;
	_transaction;

	constructor (transaction) {
		this._transaction = transaction;
		this._despachos = new Set();
		this._despachosLoaded = false;
	}

	async loadData () {
		if (this._despachosLoaded)
			return;

		const despachos = await models.Despachos.findAll({
			attributes: ["codigo"]
		});

		for (const despacho of despachos)
			this._despachos.add(despacho.codigo);

		this._despachosLoaded = true;
	}

	async findOrCreate (codigo, titulo) {
		if (!this._despachosLoaded)
			await this.loadData();

		if (this._despachos.has(codigo))
			return codigo;

		const despacho = await models.Despachos.create(
			{ codigo, titulo },
			{ transaction: this._transaction, returning: true }
		);

		this._despachos.add(despacho.codigo);
		return despacho.codigo;
	}
}

module.exports = { SyncDespachos };
