const { Axios } = require("axios");
const dayjs = require("dayjs");

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const models = require("../database/models");
const { obterStatusPorDespacho } = require("../services/status-patente");

const scrapper = new Axios({
	baseURL: "https://cie-cefet-mg.github.io/scrapper-pi/data/"
});

async function downloadPatentes () {
	const patentes = JSON.parse((await scrapper.get("busca_pi_patentes.json")).data);
	const programas = JSON.parse((await scrapper.get("busca_pi_programas.json")).data);

	const diffFormat = {};
	for (const patente of patentes.concat(programas)) {
		diffFormat[patente.codigo] = {
			codigo: patente.codigo,
			nome: patente.nome,
			dataDeposito: dayjs(patente["data-deposito"], "DD/MM/YYYY").format("YYYY-MM-DD"),
			resumo: patente.resumo,
			status: models.StatusPatente.EM_ANDAMENTO,
			inventores: patente.inventores || [],
			titulares: (patente.titulares || []).map(titular => titular.nome),
			despachos: (patente.despacho || []).map((dp, index) => ({
				sequencia: index,
				comentario: dp.comentario,
				despacho: {
					codigo: dp.codigo,
					titulo: dp.titulo
				},
				revista: {
					numRevista: Number(dp.num_revista),
					dataPublicacao: dayjs(dp.data_publicacao, "DD/MM/YYYY").format("YYYY-MM-DD")
				}
			}))
		};

		diffFormat[patente.codigo].inventores.sort();
		diffFormat[patente.codigo].titulares.sort();
		diffFormat[patente.codigo].despachos.sort((a, b) => a.sequencia - b.sequencia);

		if ("linguagens" in patente)
			diffFormat[patente.codigo].linguagens = patente.linguagens.join(",");

		for (const dp of (patente.despacho || [])) {
			const status = obterStatusPorDespacho(dp.codigo);
			if (status)
				diffFormat[patente.codigo].status = status;
		}
	}

	return diffFormat;
}

module.exports = downloadPatentes;
