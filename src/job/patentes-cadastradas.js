const dayjs = require("dayjs");

const models = require("../database/models");
const { sanitizeName } = require("../utils/sanitize-name");

async function patentesCadastradas () {
	const patentes = await models.Patentes.findAll({
		attributes: ["codigo", "nome", "dataDeposito", "resumo", "status", "tipo", "linguagens"],
		include: [{
			association: "inventores",
			attributes: ["nome"],
			required: false
		}, {
			association: "titulares",
			attributes: ["nome"],
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
		}]
	});

	const diffFormat = {};
	for (const patente of patentes) {
		diffFormat[patente.codigo] = {
			codigo: patente.codigo.trim(),
			nome: patente.nome.trim(),
			dataDeposito: dayjs(patente.dataDeposito).format("YYYY-MM-DD"),
			resumo: patente.resumo.trim(),
			status: patente.status,
			inventores: Array.from(
				new Set((patente.inventores || []).map(inventor => sanitizeName(inventor.nome)))
			),
			titulares: Array.from(
				new Set((patente.titulares || []).map(titular => sanitizeName(titular.nome)))
			),
			despachos: (patente.despachosPatente || []).map(dp => ({
				sequencia: dp.sequencia,
				comentario: dp.comentario.trim(),
				despacho: {
					codigo: dp.despacho.codigo.trim(),
					titulo: dp.despacho.titulo.trim()
				},
				revista: {
					numRevista: dp.revista.numRevista,
					dataPublicacao: dayjs(dp.revista.dataPublicacao).format("YYYY-MM-DD")
				}
			}))
		};

		diffFormat[patente.codigo].inventores.sort();
		diffFormat[patente.codigo].titulares.sort();
		diffFormat[patente.codigo].despachos.sort((a, b) => a.sequencia - b.sequencia);

		if (patente.tipo === models.TipoPatente.PROGRAMA)
			diffFormat[patente.codigo].linguagens = patente.linguagens.trim();
	}

	return diffFormat;
}

module.exports = patentesCadastradas;
