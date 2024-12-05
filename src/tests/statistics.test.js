// Configura variáveis de ambiente o mais cedo possível
require("dotenv").config({ path: ".env.tests" });

const supertest = require("supertest");

const { setup, teardown } = require("./setup-n-teardown");

describe("Testa a rota de estatísticas por status das patentes", () => {
	/**
	 * @type { import("supertest/lib/agent") };
	 */
	let supertestAPI;

	beforeAll(async () => {
		const server = await setup();
		supertestAPI = supertest(server);
	}, 60000);

	it("Deve obter a quantidade de patentes e programs de computador por status", async () => {
		const response = await supertestAPI.get("/api/v1/statistics/status").expect(200);

		expect(response.body).toMatchObject({
			PATENTE: { ARQUIVADO: 1, CONCEDIDO: 1, EM_ANDAMENTO: 1 },
			PROGRAMA: { ARQUIVADO: 0, CONCEDIDO: 1, EM_ANDAMENTO: 1 },
			TOTAL: { ARQUIVADO: 1, CONCEDIDO: 2, EM_ANDAMENTO: 2 }
		});
	});

	it("Deve obter a quantidade de patentes e programs de computador por ano", async () => {
		const response = await supertestAPI.get("/api/v1/statistics/requests/yearly").expect(200);

		expect(response.body).toMatchObject({
			PATENTE: [
				{ periodo: "2009", quantidade: 1 },
				{ periodo: "2011", quantidade: 0 },
				{ periodo: "2013", quantidade: 1 },
				{ periodo: "2018", quantidade: 1 },
				{ periodo: "2024", quantidade: 0 }
			],
			PROGRAMA: [
				{ periodo: "2009", quantidade: 0 },
				{ periodo: "2011", quantidade: 1 },
				{ periodo: "2013", quantidade: 0 },
				{ periodo: "2018", quantidade: 0 },
				{ periodo: "2024", quantidade: 1 }
			]
		});
	});

	it("Deve obter o top 5 inventores", async () => {
		const response = await supertestAPI.get("/api/v1/statistics/top-inventors/5").expect(200);

		expect(response.body).toMatchObject([
			{ nomeVisualizacao: "ALICE LÚCIA MARTINS DE OLIVEIRA", citacoes: 1, qtdPatentes: 0, qtdProgramas: 1, ranking: 1 },
			{ nomeVisualizacao: "ALINE BRUNA DA SILVA", citacoes: 1, qtdPatentes: 1, qtdProgramas: 0, ranking: 2 },
			{ nomeVisualizacao: "ANDRÉ SANTAROSA FERLAUTO", citacoes: 1, qtdPatentes: 1, qtdProgramas: 0, ranking: 3 },
			{ nomeVisualizacao: "ANÍSIO ROGÉRIO BRAGA", citacoes: 1, qtdPatentes: 1, qtdProgramas: 0, ranking: 4 },
			{ nomeVisualizacao: "BRENO ANDRADE DE MOURA", citacoes: 1, qtdPatentes: 0, qtdProgramas: 1, ranking: 5 }
		]);
	});

	it("Deve obter o top 5 titulares", async () => {
		const response = await supertestAPI.get("/api/v1/statistics/top-holders/5").expect(200);

		expect(response.body).toMatchObject([
			{ nomeVisualizacao: "CENTRO FEDERAL DE EDUCAÇÃO TECNOLÓGICA DE MINAS GERAIS", citacoes: 5, qtdPatentes: 3, qtdProgramas: 2, ranking: 1 },
			{ nomeVisualizacao: "FUNDAÇÃO DE AMPARO À PESQUISA DO ESTADO DE MINAS GERAIS", citacoes: 2, qtdPatentes: 1, qtdProgramas: 1, ranking: 2 },
			{ nomeVisualizacao: "UNIVERSIDADE FEDERAL DE MINAS GERAIS", citacoes: 2, qtdPatentes: 2, qtdProgramas: 0, ranking: 3 },
			{ nomeVisualizacao: "CENTRAIS ELÉTRICAS BRASILEIRAS S.A. - ELETROBRAS", citacoes: 1, qtdPatentes: 1, qtdProgramas: 0, ranking: 4 },
			{ nomeVisualizacao: "UNIVERSIDADE FEDERAL DOS VALES DO JEQUITINHONHA E MUCURI", citacoes: 1, qtdPatentes: 1, qtdProgramas: 0, ranking: 5 }
		]);
	});

	it("Deve obter as 5 solicitações mais recentes", async () => {
		const response = await supertestAPI.get("/api/v1/statistics/recent-requests/5").expect(200);

		expect(response.body).toMatchObject([
			{ codigo: "BR 51 2024 002341 0", nome: "JAMB", dataDeposito: "2024-07-05", status: "EM_ANDAMENTO", tipo: "PROGRAMA" },
			{ codigo: "BR 10 2018 001781 0", nome: "DISPOSITIVO E MÉTODO DE OBTENÇÃO DE MATRIZES PARA ENGENHARIA DE TECIDOS DO TECIDO CARDIOVASCULAR", dataDeposito: "2018-01-26", status: "EM_ANDAMENTO", tipo: "PATENTE" },
			{ codigo: "BR 10 2013 024870 3", nome: "NANOCOMPÓSITOS À BASE DE POLIPROPILENO, POLI (3-HIDROXIBUTIRATO) E TITANATOS NANOESTRUTURADOS, PROCESSO, PRODUTO E USO", dataDeposito: "2013-09-27", status: "ARQUIVADO", tipo: "PATENTE" },
			{ codigo: "11793-2", nome: "GEOPESQUISA - TABULADOR DE PESQUISA SOBE E DESCE COM SENHA", dataDeposito: "2011-04-05", status: "CONCEDIDO", tipo: "PROGRAMA" },
			{ codigo: "PI 0912486-1", nome: "MÓDULO DE INSTRUMENTAÇÃO, CONTROLE E AUTOMAÇÃO", dataDeposito: "2009-09-17", status: "CONCEDIDO", tipo: "PATENTE" }
		]);
	});

	afterAll(teardown, 60000);
});
