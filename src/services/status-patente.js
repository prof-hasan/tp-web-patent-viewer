const models = require("../database/models");

const despachosArquivamento = [
	// Patentes
	"4.3.1", "8.6", "11.1", "11.5", "11.12", "11.17",
	"8.11", "11.1.1", "11.4", "11.2", "11.6", "11.11",
	"9.2", "9.2.3", "9.2.4",
	"15.21",

	// Programas de Computador
	"106", "709", "742",

	// Outros
	"404", "139", "157", "289", "291", "150"
];

const despachosConcessao = [
	// Patentes
	"16.1", "16.3",
	"9.1",

	// Programas de Computador
	"120", "730", "745",

	// Outros
	"158", "400"
];

const despachosRetomarAndamento = [
	// Patentes
	"11.14", "8.8", "16.2", "16.4",
	"9.1.1", "9.1.2",
	"9.2.1", "9.2.2", "9.2.4.1",
	"15.30",

	// Programas de Computador
	"743", "744"
];

function obterStatusPorDespacho (codigoDespacho) {
	if (despachosArquivamento.includes(codigoDespacho.toString()))
		return models.StatusPatente.ARQUIVADO;

	if (despachosConcessao.includes(codigoDespacho.toString()))
		return models.StatusPatente.CONCEDIDO;

	if (despachosRetomarAndamento.includes(codigoDespacho.toString()))
		return models.StatusPatente.EM_ANDAMENTO;

	return null;
}

module.exports = { obterStatusPorDespacho };
