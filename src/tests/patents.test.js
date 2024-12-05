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

	it("Deve obter as patentes filtradas", async () => {
		const response = await supertestAPI.get("/api/v1/patents/filter?end=2024-08-03&start=2011-01-01&status[]=ARQUIVADO&status[]=CONCEDIDO").expect(200);

		expect(response.body).toMatchObject([
			{
				codigo: "BR 10 2013 024870 3",
				nome: "NANOCOMPÓSITOS À BASE DE POLIPROPILENO, POLI (3-HIDROXIBUTIRATO) E TITANATOS NANOESTRUTURADOS, PROCESSO, PRODUTO E USO",
				dataDeposito: "2013-09-27",
				tipo: "PATENTE",
				status: "ARQUIVADO"
			},
			{
				codigo: "11793-2",
				nome: "GEOPESQUISA - TABULADOR DE PESQUISA SOBE E DESCE COM SENHA",
				dataDeposito: "2011-04-05",
				tipo: "PROGRAMA",
				status: "CONCEDIDO",
				linguagens: ["C#", "FRAMEWORK .NET"]
			}
		]);
	});

	it("Deve obter os detalhes de uma patente", async () => {
		const response = await supertestAPI.get("/api/v1/patents/details/BR%2010%202018%20001781%200").expect(200);

		expect(response.body).toMatchObject({
			codigo: "BR 10 2018 001781 0",
			nome: "DISPOSITIVO E MÉTODO DE OBTENÇÃO DE MATRIZES PARA ENGENHARIA DE TECIDOS DO TECIDO CARDIOVASCULAR",
			dataDeposito: "2018-01-26",
			resumo: "A presente invenção descreve os modelos, moldes e matrizes para a engenharia do tecido cardiovascular, particularmente estruturas responsáveis pela manutenção do fluxo unidirecional sanguíneo. As matrizes possuem uma estrutura tridimensional e são constituídas por materiais poliméricos e/ou compósitos biocompatíveis na forma de espumas, fibras e/ou membranas e apresentam morfologia, porosidade e tamanho de poros exigidos para crescimento e regeneração tecidual podendo ser aplicadas na Engenharia do tecido cardiovascular para crescimento da estrutura tridimensional in vitro ou regeneração in vivo. Essas matrizes são produzidas utilizando os moldes que são obtidos a partir dos modelos também descritos na presente invenção. A presente invenção também descreve o método de obtenção das matrizes, do modelo e o molde que consistem da combinação das técnicas de manufatura aditiva com técnicas de produção de scaffolds porosos e/ou fibrosos.",
			status: "EM_ANDAMENTO",
			tipo: "PATENTE",
			inventores: [
				"ALINE BRUNA DA SILVA",
				"DANIELLE MARRA DE FREITAS DA SILVA",
				"GUILHERME HOFFMAN DE CASTRO",
				"JULIANA JÉSSICA LOPES ROSA",
				"ROBERTA VIANA FERREIRA"
			],
			titulares: [
				"CENTRO FEDERAL DE EDUCAÇÃO TECNOLÓGICA DE MINAS GERAIS"
			],
			despachosPatente: [
				{
					sequencia: 1,
					comentario: "O INPI confirma o recebimento de pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção. Não é necessário responder a este despacho. O INPI fará, em seguida, o exame formal preliminar para verificar se o depositante atendeu às condições estabelecidas no Art. 19 da Lei 9.279/1996 e nas normas em vigor no Instituto. Se o depósito foi efetuado por procurador, este deverá apresentar a procuração no prazo de até 60 (sessenta) dias, a contar da data do depósito. Isso deve ser feito mesmo sem o INPI emitir notificação ou exigência, conforme o Art. 216 da Lei 9.279/1996. O pedido será arquivado definitivamente caso a procuração não seja apresentada no prazo previsto. As solicitações de entrada em fase nacional no Brasil via Tratado de Cooperação em Matéria de Patentes (PCT, na sigla em inglês) são notificadas pelo despacho 1.1. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento a eventuais exigências e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI.. Número de Protocolo '870180007271' em 26/01/2018 17:39 (WB)",
					despacho: {
						codigo: "2.10",
						titulo: "Pedido de Patente ou Certificado de Adição de Invenção Recebido"
					},
					revista: {
						numRevista: 2457,
						dataPublicacao: "2018-02-06"
					}
				},
				{
					sequencia: 2,
					comentario: "O INPI considera depositado o pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção, após ter concluído seu exame formal. O parecer está disponível na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O conteúdo do pedido será publicado na Revista da Propriedade Industrial (RPI) após 18 (dezoito) meses em sigilo, contados a partir da data do depósito ou da prioridade mais antiga. O depositante poderá solicitar que essa publicação seja antecipada. No caso do pedido de Certificado de Adição, este será divulgado após a publicação do pedido principal. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento aos prazos e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI..",
					despacho: {
						codigo: "2.1",
						titulo: "Pedido de Patente ou Certificado de Adição de Invenção Depositado"
					},
					revista: {
						numRevista: 2481,
						dataPublicacao: "2018-07-24"
					}
				},
				{
					sequencia: 3,
					comentario: "Quando o período de sigilo (18 meses do depósito) é finalizado, o INPI publica o pedido de Patente ou de Certificado de Adição de Invenção, conforme previsto no Art. 30 da Lei nº 9.279/96. Os interessados podem acessar a documentação do pedido (relatório descritivo, reivindicações, desenhos - se for o caso - e resumo) na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O depositante ou qualquer interessado pode solicitar o exame do pedido de patente, caso isso ainda não tenha sido feito. O prazo é de 36 (trinta e seis) meses, contados da data do depósito. Para tal, o usuário deverá pagar a guia de recolhimento da união (GRU) de código 203 (Patente de Invenção), 204 (Modelo de Utilidade) ou 205 (Certificado de Adição de Invenção). Se o INPI já examinou o pedido internacional PCT como ISA/IPEA, o código é 284 (Patente de Invenção) ou 285 (Modelo de Utilidade). O pedido será arquivado se o pagamento não for feito no prazo previsto, conforme o Art.33 da Lei nº 9.279/96. O requerente tem o prazo de 60 (sessenta) dias contatos a partir da data do arquivamento para pagar a GRU de código 209 (Desarquivamento). O INPI arquivará o pedido definitivamente se o depositante não comprovar, no referido prazo, o pagamento dos dois serviços (desarquivamento e pedido de exame)..",
					despacho: {
						codigo: "3.1",
						titulo: "Pedido de Patente ou de Certificado de Adição de Invenção Publicado"
					},
					revista: {
						numRevista: 2536,
						dataPublicacao: "2019-08-13"
					}
				},
				{
					sequencia: 4,
					comentario: "O INPI arquivou o pedido pela falta de pagamento(s) de retribuição anual (anuidade), por pagamento da retribuição anual fora do prazo ou pela falta de cumprimento de exigência de complementação de anuidade nos prazos estabelecidos na Lei nº 9.279/96 (LPI) e normativos específicos em vigor. O depositante deve acessar o parecer na Busca de Processos (Portal do INPI) para obter mais informações. O prazo para o depositante para requerer a restauração do pedido é de 3 (três) meses contados a partir da data desta publicação. Para isso, o depositante deverá pagar 1 (uma) Guia de Recolhimento da União (GRU) de código 208 (restauração) e obedecer aos critérios estabelecidos nesta notificação, na tabela de retribuições e nos normativos vigentes. Além disso, o depositante deverá pagar GRU(s) de anuidade no prazo extraordinário previsto no Art. 84º § 2º da LPI e/ou de complementação de retribuição (código 800 da Administração Geral) conforme citadas nesta notificação. Se as GRUs forem pagas por intermédio de procurador, este deverá apresentar a procuração do depositante de acordo com os Arts. 216 e 217 da LPI em até 60 (sessenta) dias contados da data do pagamento da GRU 208. O INPI manterá o arquivamento do pedido de forma definitiva, se o requerimento de restauração não atender aos critérios estabelecidos no Art. 15 da Portaria INPI PR n° 52/23, ensejando a aplicação do disposto no art. 17, da mesma portaria. Acesse no Portal do INPI: A LPI, demais normativos em vigor, a tabela de retribuições com os códigos das GRUs e o Sistema de Emissão de GRU.. Referente à 6ª anuidade.",
					despacho: {
						codigo: "8.6",
						titulo: "Arquivamento - Art. 86 da LPI"
					},
					revista: {
						numRevista: 2759,
						dataPublicacao: "2023-11-21"
					}
				},
				{
					sequencia: 5,
					comentario: "O INPI anula despacho por ter sido indevido. O depositante deve acessar o parecer e/ou o texto complementar ao despacho na Busca de Processos (Portal do INPI) para ver o despacho que foi anulado e para conhecer os motivos de sua anulação. Não é necessário responder a este despacho.. Anulada a publicação código 8.6 na RPI nº 2759 de 21/11/2023 por ter sido indevida.",
					despacho: {
						codigo: "8.8",
						titulo: "Despacho Anulado"
					},
					revista: {
						numRevista: 2763,
						dataPublicacao: "2023-12-19"
					}
				}
			]
		});
	});

	afterAll(teardown, 60000);
});
