// Configura variáveis de ambiente o mais cedo possível
require("dotenv").config({ path: ".env.tests" });

const supertest = require("supertest");

const { setup, teardown } = require("./setup-n-teardown");

describe("Testa a rota de estatísticas por status das patentes", () => {
	beforeAll(setup, 60000);

	it("Deve obter a quantidade de patentes e programs de computador por status", async () => {
		// App is used with supertest to simulate server request
		const { app } = require("../app");
		const response = await supertest(app)
			.get("/v1/statistics/status")
			.expect(200);

		expect(response.body).toMatchObject({
			PATENTE: {
				ARQUIVADO: 51,
				CONCEDIDO: 9,
				EM_ANDAMENTO: 31
			},
			PROGRAMA: {
				ARQUIVADO: 2,
				CONCEDIDO: 123,
				EM_ANDAMENTO: 0
			},
			TOTAL: {
				ARQUIVADO: 53,
				CONCEDIDO: 132,
				EM_ANDAMENTO: 31
			}
		});
	});

	afterAll(teardown, 60000);
});
