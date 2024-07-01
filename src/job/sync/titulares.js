const NodeCache = require("node-cache");

const models = require("../../database/models");

class SyncTitulares {
	_cache;
	_cacheLoaded;
	_transaction;

	constructor (transaction) {
		this._transaction = transaction;
		this._cache = new NodeCache();
		this._cacheLoaded = false;
	}

	async loadData () {
		if (this._cacheLoaded)
			return;

		const titulares = await models.Titulares.findAll({
			attributes: ["idTitular", "nome"]
		});

		for (const titular of titulares)
			this._cache.set(titular.nome, titular.idTitular);

		this._cacheLoaded = true;
	}

	async find (nome) {
		if (!this._cacheLoaded)
			await this.loadData();

		return this._cache.get(nome);
	}

	async findOrCreate (nome) {
		if (!this._cacheLoaded)
			await this.loadData();

		const idTitular = this._cache.get(nome);
		if (idTitular)
			return idTitular;

		const titular = await models.Titulares.create(
			{ nome },
			{ transaction: this._transaction, returning: true }
		);

		this._cache.set(titular.nome, titular.idTitular);
		return titular.idTitular;
	}
}

module.exports = { SyncTitulares };
