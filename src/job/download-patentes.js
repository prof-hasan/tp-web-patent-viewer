const { Axios } = require("axios");
const dayjs = require("dayjs");

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const models = require("../database/models");
const { obterStatusPorDespacho } = require("../services/status-patente");
const { sanitizeName } = require("../utils/sanitize-name");

const scrapper = new Axios({
	baseURL: "https://cie-cefet-mg.github.io/scrapper-pi/data/"
});

async function downloadPatentes () {
	const patentes = JSON.parse((await scrapper.get("busca_pi_patentes.json")).data);
	const programas = JSON.parse((await scrapper.get("busca_pi_programas.json")).data);

	const diffFormat = {};
	const namesDict = {};

	for (const patente of patentes.concat(programas)) {
		diffFormat[patente.codigo] = {
			codigo: patente.codigo.trim(),
			nome: patente.nome.trim(),
			dataDeposito: dayjs(patente["data-deposito"], "DD/MM/YYYY").format("YYYY-MM-DD"),
			resumo: patente.resumo.trim(),
			status: models.StatusPatente.EM_ANDAMENTO,
			inventores: new Set(),
			titulares: new Set(),
			despachos: (patente.despacho || []).map((dp, index) => ({
				sequencia: index,
				comentario: dp.comentario.trim(),
				despacho: {
					codigo: dp.codigo.trim(),
					titulo: dp.titulo.trim()
				},
				revista: {
					numRevista: Number(dp.num_revista),
					dataPublicacao: dayjs(dp.data_publicacao, "DD/MM/YYYY").format("YYYY-MM-DD")
				}
			}))
		};

		for (const inventor of patente.inventores || []) {
			const name = sanitizeName(inventor);
			diffFormat[patente.codigo].inventores.add(name);
			namesDict[name] = inventor;
		}

		for (const titular of patente.titulares || []) {
			const name = sanitizeName(titular.nome);
			diffFormat[patente.codigo].titulares.add(name);
			namesDict[name] = titular.nome;
		}

		diffFormat[patente.codigo].inventores = Array.from(diffFormat[patente.codigo].inventores).sort();
		diffFormat[patente.codigo].titulares = Array.from(diffFormat[patente.codigo].titulares).sort();
		diffFormat[patente.codigo].despachos.sort((a, b) => a.sequencia - b.sequencia);

		if ("linguagens" in patente)
			diffFormat[patente.codigo].linguagens = patente.linguagens.join(",").trim();

		for (const dp of (patente.despacho || [])) {
			const status = obterStatusPorDespacho(dp.codigo);
			if (status)
				diffFormat[patente.codigo].status = status;
		}
	}

	return { diffFormat, namesDict };
}

module.exports = downloadPatentes;
