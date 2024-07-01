const dayjs = require("dayjs");
const models = require("../database/models");

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
			codigo: patente.codigo,
			nome: patente.nome,
			dataDeposito: dayjs(patente.dataDeposito).format("YYYY-MM-DD"),
			resumo: patente.resumo,
			status: patente.status,
			inventores: (patente.inventores || []).map(inventor => inventor.nome),
			titulares: (patente.titulares || []).map(titular => titular.nome),
			despachos: (patente.despachosPatente || []).map(dp => ({
				sequencia: dp.sequencia,
				comentario: dp.comentario,
				despacho: {
					codigo: dp.despacho.codigo,
					titulo: dp.despacho.titulo
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
			diffFormat[patente.codigo].linguagens = patente.linguagens;
	}

	return diffFormat;
}

module.exports = patentesCadastradas;
