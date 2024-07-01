const models = require("../database/models");

const despachosArquivamento = [];
const despachosConcessao = [];

function obterStatusPorDespacho (codigoDespacho) {
	if (despachosArquivamento.includes(codigoDespacho.toString()))
		return models.StatusPatente.ARQUIVADO;

	if (despachosConcessao.includes(codigoDespacho.toString()))
		return models.StatusPatente.CONCEDIDO;

	return null;
}

module.exports = { obterStatusPorDespacho };
