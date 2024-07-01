const NodeCache = require("node-cache");

const models = require("../../database/models");

class SyncInventores {
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

		const inventores = await models.Inventores.findAll({
			attributes: ["idInventor", "nome"]
		});

		for (const inventor of inventores)
			this._cache.set(inventor.nome, inventor.idInventor);

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

		const idInventor = this._cache.get(nome);
		if (idInventor)
			return idInventor;

		const inventor = await models.Inventores.create(
			{ nome },
			{ transaction: this._transaction, returning: true }
		);

		this._cache.set(inventor.nome, inventor.idInventor);
		return inventor.idInventor;
	}
}

module.exports = { SyncInventores };
