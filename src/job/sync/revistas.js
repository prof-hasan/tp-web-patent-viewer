const dayjs = require("dayjs");

const models = require("../../database/models");

class SyncRevistas {
	_numRevistas;
	_numRevistasLoaded;
	_transaction;

	constructor (transaction) {
		this._transaction = transaction;
		this._numRevistas = new Set();
		this._numRevistasLoaded = false;
	}

	async loadData () {
		if (this._numRevistasLoaded)
			return;

		const revistas = await models.Revistas.findAll({
			attributes: ["numRevista"]
		});

		for (const revista of revistas)
			this._numRevistas.add(revista.numRevista);

		this._numRevistasLoaded = true;
	}

	async findOrCreate (numRevista, dataPublicacao) {
		if (!this._numRevistasLoaded)
			await this.loadData();

		if (this._numRevistas.has(Number(numRevista)))
			return Number(numRevista);

		const revista = await models.Revistas.create({
			numRevista: Number(numRevista),
			dataPublicacao: dayjs(dataPublicacao).format("YYYY-MM-DD")
		}, {
			transaction: this._transaction,
			returning: true
		});

		this._numRevistas.add(revista.numRevista);
		return revista.numRevista;
	}
}

module.exports = { SyncRevistas };
