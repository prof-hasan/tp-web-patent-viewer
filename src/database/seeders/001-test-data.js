"use strict";

const inventores = [
	{ id_inventor: 17, nome: "PATRICIA SANTIAGO DE OLIVEIRA PATRICIO", nome_visualizacao: "PATRICIA SANTIAGO DE OLIVEIRA PATRICIO" },
	{ id_inventor: 69, nome: "RODRIGO LAMBERT OREFICE", nome_visualizacao: "RODRIGO LAMBERT ORÉFICE" },
	{ id_inventor: 73, nome: "RENATO GUIMARAES RIBEIRO", nome_visualizacao: "RENATO GUIMARÃES RIBEIRO" },
	{ id_inventor: 75, nome: "ANISIO ROGERIO BRAGA", nome_visualizacao: "ANÍSIO ROGÉRIO BRAGA" },
	{ id_inventor: 76, nome: "CARMELA MARIA POLITO BRAGA", nome_visualizacao: "CARMELA MARIA POLITO BRAGA" },
	{ id_inventor: 104, nome: "ANDRE SANTAROSA FERLAUTO", nome_visualizacao: "ANDRÉ SANTAROSA FERLAUTO" },
	{ id_inventor: 105, nome: "DIEGO CARVALHO BARBOSA ALVES", nome_visualizacao: "DIEGO CARVALHO BARBOSA ALVES" },
	{ id_inventor: 106, nome: "JUAN PEDRO BRETAS ROA", nome_visualizacao: "JUAN PEDRO BRETAS ROA" },
	{ id_inventor: 107, nome: "ROCHEL MONTERO LAGO", nome_visualizacao: "ROCHEL MONTERO LAGO" },
	{ id_inventor: 131, nome: "ALINE BRUNA DA SILVA", nome_visualizacao: "ALINE BRUNA DA SILVA" },
	{ id_inventor: 132, nome: "DANIELLE MARRA DE FREITAS DA SILVA", nome_visualizacao: "DANIELLE MARRA DE FREITAS DA SILVA" },
	{ id_inventor: 133, nome: "GUILHERME HOFFMAN DE CASTRO", nome_visualizacao: "GUILHERME HOFFMAN DE CASTRO" },
	{ id_inventor: 134, nome: "JULIANA JESSICA LOPES ROSA", nome_visualizacao: "JULIANA JÉSSICA LOPES ROSA" },
	{ id_inventor: 135, nome: "ROBERTA VIANA FERREIRA", nome_visualizacao: "ROBERTA VIANA FERREIRA" },
	{ id_inventor: 229, nome: "ALICE LUCIA MARTINS DE OLIVEIRA", nome_visualizacao: "ALICE LÚCIA MARTINS DE OLIVEIRA" },
	{ id_inventor: 230, nome: "BRENO ANDRADE DE MOURA", nome_visualizacao: "BRENO ANDRADE DE MOURA" },
	{ id_inventor: 231, nome: "EDUARDO GOMES CARVALHO", nome_visualizacao: "EDUARDO GOMES CARVALHO" },
	{ id_inventor: 232, nome: "JULYA GOMES MODERNA", nome_visualizacao: "JULYA GOMES MODERNA" },
	{ id_inventor: 233, nome: "MIGUEL MORENO BARBOSA", nome_visualizacao: "MIGUEL MORENO BARBOSA" },
	{ id_inventor: 234, nome: "WEDSON GOMES DA SILVEIRA JUNIOR", nome_visualizacao: "WEDSON GOMES DA SILVEIRA JUNIOR" },
	{ id_inventor: 380, nome: "TUFFI SALIBA NETO", nome_visualizacao: "TUFFI SALIBA NETO" }
];

const titulares = [
	{ id_titular: 1, nome: "CENTRO FEDERAL DE EDUCACAO TECNOLOGICA DE MINAS GERAIS", nome_visualizacao: "CENTRO FEDERAL DE EDUCAÇÃO TECNOLÓGICA DE MINAS GERAIS" },
	{ id_titular: 12, nome: "UNIVERSIDADE FEDERAL DE MINAS GERAIS", nome_visualizacao: "UNIVERSIDADE FEDERAL DE MINAS GERAIS" },
	{ id_titular: 18, nome: "CENTRAIS ELETRICAS BRASILEIRAS S.A. - ELETROBRAS", nome_visualizacao: "CENTRAIS ELÉTRICAS BRASILEIRAS S.A. - ELETROBRAS" },
	{ id_titular: 25, nome: "FUNDACAO DE AMPARO A PESQUISA DO ESTADO DE MINAS GERAIS", nome_visualizacao: "FUNDAÇÃO DE AMPARO À PESQUISA DO ESTADO DE MINAS GERAIS" },
	{ id_titular: 30, nome: "UNIVERSIDADE FEDERAL DOS VALES DO JEQUITINHONHA E MUCURI", nome_visualizacao: "UNIVERSIDADE FEDERAL DOS VALES DO JEQUITINHONHA E MUCURI" },
	{ id_titular: 29, nome: "FUNDACAO DE AMPARO A PESQUISA DE MINAS GERAIS", nome_visualizacao: "FUNDAÇÃO DE AMPARO À PESQUISA DO ESTADO DE MINAS GERAIS" },
	{ id_titular: 15, nome: "CENTRO FEDERAL DE EDUCACAO TECNOLOGICA DE MINAS GERAIS - CEFET-MG", nome_visualizacao: "CENTRO FEDERAL DE EDUCAÇÃO TECNOLÓGICA DE MINAS GERAIS" },
	{ id_titular: 19, nome: "CENTRO FEDERAL DE EDUCACAO TECNOLOGICA DE MINAS GERAIS - CEFET", nome_visualizacao: "CENTRO FEDERAL DE EDUCAÇÃO TECNOLÓGICA DE MINAS GERAIS" }
];

const despachos = [
	{ codigo: "2.10", titulo: "Pedido de Patente ou Certificado de Adição de Invenção Recebido" },
	{ codigo: "2.1", titulo: "Pedido de Patente ou Certificado de Adição de Invenção Depositado" },
	{ codigo: "9.1", titulo: "Deferimento - Art. 38 da LPI e Resolução 72/2013" },
	{ codigo: "16.1", titulo: "Concessão de Patente ou Certificado de Adição de Invenção." },
	{ codigo: "3.1", titulo: "Pedido de Patente ou de Certificado de Adição de Invenção Publicado" },
	{ codigo: "15.7", titulo: "Petição não Conhecida." },
	{ codigo: "25.1", titulo: "Transferência Deferida." },
	{ codigo: "6.6.1", titulo: "Exigência Formal - Art. 38 (I) da Lei 13.123/2015" },
	{ codigo: "6.22", titulo: "Exigência preliminar - Pedidos sem buscas realizadas por outros Escritórios de Patentes - Art. 36 da LPI" },
	{ codigo: "8.6", titulo: "Arquivamento - Art. 86 da LPI" },
	{ codigo: "6.1", titulo: "Exigência Técnica - Art. 36 da LPI" },
	{ codigo: "8.8", titulo: "Despacho Anulado" },
	{ codigo: "6.7", titulo: "Outras Exigências - Art. 36 da LPI" },
	{ codigo: "080", titulo: "Publicação de pedido de Registro de Programa de Computador." },
	{ codigo: "090", titulo: "Deferimento de pedido de registro de programa de computador." },
	{ codigo: "120", titulo: "Concessão do Registro." }
];

const patentes = [
	// ===== PATENTES ===== //
	{ codigo: "BR 10 2013 024870 3", nome: "NANOCOMPÓSITOS À BASE DE POLIPROPILENO, POLI (3-HIDROXIBUTIRATO) E TITANATOS NANOESTRUTURADOS, PROCESSO, PRODUTO E USO", data_deposito: "2013-09-27", resumo: "NANOCOMPÓSITOS À BASE DE POLIPROPILENO, POLI(3- HIDROXIBUTIRATO) E TITANATOS NANOESTRUTURADOS, PROCESSO PRODUTO E USO A presente invenção descreve a formulação de um novo produto e seus usos, caracterizado como nanocompósitos contendo polipropileno (PP), polipropileno grafitizado com anidrido maléico (PP-g-Am), poli(3- hidroxidobutirato) (PHB) e estruturas nanoestruturadas produzidas a partir de TiO2 (TNT) que podem ser produzidos por processamento mecânico. O produto 0 formado é uma resina com propriedades de termoplástico que pode então ser cominuído e então usado como base para a fabricação de peças termomoldadas ou por injeção. Os nanocompósitos apresentam a capacidade de desacelerar a biodegradação do PHB em solo e manter propriedades mecânicas ainda semelhantes à matriz polimérica. Como a resina é composta por materiais não tóxicos tem possibilidade de aplicação em sistemas inteligentes para liberação de moléculas de baixa massa molecular. O material pode ser usado na indústria de embalagens e descartáveis, entre outras. A adição de cargas e/ou aditivos à matriz polimérica amplia sua utilização em aplicações na indústria agrícola (para a liberação controlada de nutrientes em solo), também na indústria de alimentos, farmacêutica e biomédica, não imitante.", status: "ARQUIVADO", tipo: "PATENTE" },
	{ codigo: "BR 10 2018 001781 0", nome: "DISPOSITIVO E MÉTODO DE OBTENÇÃO DE MATRIZES PARA ENGENHARIA DE TECIDOS DO TECIDO CARDIOVASCULAR", data_deposito: "2018-01-26", resumo: "A presente invenção descreve os modelos, moldes e matrizes para a engenharia do tecido cardiovascular, particularmente estruturas responsáveis pela manutenção do fluxo unidirecional sanguíneo. As matrizes possuem uma estrutura tridimensional e são constituídas por materiais poliméricos e/ou compósitos biocompatíveis na forma de espumas, fibras e/ou membranas e apresentam morfologia, porosidade e tamanho de poros exigidos para crescimento e regeneração tecidual podendo ser aplicadas na Engenharia do tecido cardiovascular para crescimento da estrutura tridimensional in vitro ou regeneração in vivo. Essas matrizes são produzidas utilizando os moldes que são obtidos a partir dos modelos também descritos na presente invenção. A presente invenção também descreve o método de obtenção das matrizes, do modelo e o molde que consistem da combinação das técnicas de manufatura aditiva com técnicas de produção de scaffolds porosos e/ou fibrosos.", status: "EM_ANDAMENTO", tipo: "PATENTE" },
	{ codigo: "PI 0912486-1", nome: "MÓDULO DE INSTRUMENTAÇÃO, CONTROLE E AUTOMAÇÃO", data_deposito: "2009-09-17", resumo: "O presente pedido de patente descreve um Módulo de Instrumentaçâo, Controle e Automação (MICA) desenvolvido para atividades de ensino laboratorial e treinamento técnico nas áreas de controle e automação industrial e predial. Mais particularmente, a tecnologia ora proposta (MICA) apresenta uma estrutura flexível e versátil de software e hardware que permite desenvolver, testar e validar projetos de sistemas de automação com diversos sensores, atuadores plantas piloto industriais, sendo que os testes e experimentos podem ser feitos em laboratórios ou próximos a plantas industriais.", status: "CONCEDIDO", tipo: "PATENTE" },

	// ===== PROGRAMAS DE COMPUTADOR ===== //
	{ codigo: "11793-2", nome: "GEOPESQUISA - TABULADOR DE PESQUISA SOBE E DESCE COM SENHA", data_deposito: "2011-04-05", resumo: "", status: "CONCEDIDO", tipo: "PROGRAMA", linguagens: "C#,FRAMEWORK .NET" },
	{ codigo: "BR 51 2024 002341 0", nome: "JAMB", data_deposito: "2024-07-05", resumo: "", status: "EM_ANDAMENTO", tipo: "PROGRAMA", linguagens: "CSS,HTML,PHP" }
];

const inventores_patentes = [
	{ id_inventor: 75, codigo_patente: "PI 0912486-1" },
	{ id_inventor: 76, codigo_patente: "PI 0912486-1" },
	{ id_inventor: 104, codigo_patente: "BR 10 2013 024870 3" },
	{ id_inventor: 105, codigo_patente: "BR 10 2013 024870 3" },
	{ id_inventor: 106, codigo_patente: "BR 10 2013 024870 3" },
	{ id_inventor: 17, codigo_patente: "BR 10 2013 024870 3" },
	{ id_inventor: 107, codigo_patente: "BR 10 2013 024870 3" },
	{ id_inventor: 69, codigo_patente: "BR 10 2013 024870 3" },
	{ id_inventor: 131, codigo_patente: "BR 10 2018 001781 0" },
	{ id_inventor: 132, codigo_patente: "BR 10 2018 001781 0" },
	{ id_inventor: 133, codigo_patente: "BR 10 2018 001781 0" },
	{ id_inventor: 134, codigo_patente: "BR 10 2018 001781 0" },
	{ id_inventor: 135, codigo_patente: "BR 10 2018 001781 0" },
	{ id_inventor: 229, codigo_patente: "BR 51 2024 002341 0" },
	{ id_inventor: 230, codigo_patente: "BR 51 2024 002341 0" },
	{ id_inventor: 231, codigo_patente: "BR 51 2024 002341 0" },
	{ id_inventor: 232, codigo_patente: "BR 51 2024 002341 0" },
	{ id_inventor: 233, codigo_patente: "BR 51 2024 002341 0" },
	{ id_inventor: 234, codigo_patente: "BR 51 2024 002341 0" },
	{ id_inventor: 73, codigo_patente: "11793-2" },
	{ id_inventor: 380, codigo_patente: "11793-2" }
];

const titulares_patentes = [
	{ id_titular: 18, codigo_patente: "PI 0912486-1" },
	{ id_titular: 19, codigo_patente: "PI 0912486-1" },
	{ id_titular: 12, codigo_patente: "PI 0912486-1" },
	{ id_titular: 15, codigo_patente: "BR 10 2013 024870 3" },
	{ id_titular: 29, codigo_patente: "BR 10 2013 024870 3" },
	{ id_titular: 12, codigo_patente: "BR 10 2013 024870 3" },
	{ id_titular: 30, codigo_patente: "BR 10 2013 024870 3" },
	{ id_titular: 1, codigo_patente: "BR 10 2018 001781 0" },
	{ id_titular: 1, codigo_patente: "BR 51 2024 002341 0" },
	{ id_titular: 1, codigo_patente: "11793-2" },
	{ id_titular: 25, codigo_patente: "11793-2" }
];

const revistas = [
	{ num_revista: 2099, data_publicacao: "2011-03-29" },
	{ num_revista: 2117, data_publicacao: "2011-08-02" },
	{ num_revista: 2120, data_publicacao: "2011-08-23" },
	{ num_revista: 2131, data_publicacao: "2011-11-08" },
	{ num_revista: 2147, data_publicacao: "2012-02-28" },
	{ num_revista: 2174, data_publicacao: "2012-09-04" },
	{ num_revista: 2291, data_publicacao: "2014-12-02" },
	{ num_revista: 2301, data_publicacao: "2015-02-10" },
	{ num_revista: 2326, data_publicacao: "2015-08-04" },
	{ num_revista: 2457, data_publicacao: "2018-02-06" },
	{ num_revista: 2481, data_publicacao: "2018-07-24" },
	{ num_revista: 2531, data_publicacao: "2019-07-09" },
	{ num_revista: 2533, data_publicacao: "2019-07-23" },
	{ num_revista: 2536, data_publicacao: "2019-08-13" },
	{ num_revista: 2541, data_publicacao: "2019-09-17" },
	{ num_revista: 2567, data_publicacao: "2020-03-17" },
	{ num_revista: 2579, data_publicacao: "2020-06-09" },
	{ num_revista: 2600, data_publicacao: "2020-11-03" },
	{ num_revista: 2621, data_publicacao: "2021-03-30" },
	{ num_revista: 2626, data_publicacao: "2021-05-04" },
	{ num_revista: 2759, data_publicacao: "2023-11-21" },
	{ num_revista: 2763, data_publicacao: "2023-12-19" }
];

const despachos_patentes = [
	{ codigo_despacho: "080", codigo_patente: "11793-2", num_revista: 2117, sequencia: 1, comentario: "" },
	{ codigo_despacho: "090", codigo_patente: "11793-2", num_revista: 2120, sequencia: 2, comentario: "" },
	{ codigo_despacho: "120", codigo_patente: "11793-2", num_revista: 2131, sequencia: 3, comentario: "" },
	{ codigo_despacho: "15.7", codigo_patente: "BR 10 2013 024870 3", num_revista: 2567, sequencia: 7, comentario: "Não conhecimento da petição apresentada em virtude do disposto nos Arts. 218 ou 219 da LPI. Não conhecida a petição nº 870190133044 de 13/12/2019, em virtude do disposto no artº219, inciso II e III da LPI" },
	{ codigo_despacho: "16.1", codigo_patente: "PI 0912486-1", num_revista: 2626, sequencia: 7, comentario: "Expedição da carta-patente ou do certificado de adição de invenção. O título acha-se à disposição do interessado no setor competente do INPI. Desta data corre o prazo de 6 (seis) meses para interposição de nulidade administrativa por qualquer interessado (Art. 51 da LPI ).O certificado de adição é acessório da patente, tem a data final de vigência desta e a acompanha para todos os efeitos legais.. 10 (dez) anos contados a partir de 04/05/2021, observadas as condições legais" },
	{ codigo_despacho: "2.1", codigo_patente: "PI 0912486-1", num_revista: 2099, sequencia: 1, comentario: "O INPI considera depositado o pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção, após ter concluído seu exame formal. O parecer está disponível na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O conteúdo do pedido será publicado na Revista da Propriedade Industrial (RPI) após 18 (dezoito) meses em sigilo, contados a partir da data do depósito ou da prioridade mais antiga. O depositante poderá solicitar que essa publicação seja antecipada. No caso do pedido de Certificado de Adição, este será divulgado após a publicação do pedido principal. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento aos prazos e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI.." },
	{ codigo_despacho: "2.1", codigo_patente: "BR 10 2013 024870 3", num_revista: 2301, sequencia: 2, comentario: "O INPI considera depositado o pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção, após ter concluído seu exame formal. O parecer está disponível na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O conteúdo do pedido será publicado na Revista da Propriedade Industrial (RPI) após 18 (dezoito) meses em sigilo, contados a partir da data do depósito ou da prioridade mais antiga. O depositante poderá solicitar que essa publicação seja antecipada. No caso do pedido de Certificado de Adição, este será divulgado após a publicação do pedido principal. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento aos prazos e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI.." },
	{ codigo_despacho: "2.1", codigo_patente: "BR 10 2018 001781 0", num_revista: 2481, sequencia: 2, comentario: "O INPI considera depositado o pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção, após ter concluído seu exame formal. O parecer está disponível na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O conteúdo do pedido será publicado na Revista da Propriedade Industrial (RPI) após 18 (dezoito) meses em sigilo, contados a partir da data do depósito ou da prioridade mais antiga. O depositante poderá solicitar que essa publicação seja antecipada. No caso do pedido de Certificado de Adição, este será divulgado após a publicação do pedido principal. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento aos prazos e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI.." },
	{ codigo_despacho: "2.10", codigo_patente: "BR 10 2018 001781 0", num_revista: 2457, sequencia: 1, comentario: "O INPI confirma o recebimento de pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção. Não é necessário responder a este despacho. O INPI fará, em seguida, o exame formal preliminar para verificar se o depositante atendeu às condições estabelecidas no Art. 19 da Lei 9.279/1996 e nas normas em vigor no Instituto. Se o depósito foi efetuado por procurador, este deverá apresentar a procuração no prazo de até 60 (sessenta) dias, a contar da data do depósito. Isso deve ser feito mesmo sem o INPI emitir notificação ou exigência, conforme o Art. 216 da Lei 9.279/1996. O pedido será arquivado definitivamente caso a procuração não seja apresentada no prazo previsto. As solicitações de entrada em fase nacional no Brasil via Tratado de Cooperação em Matéria de Patentes (PCT, na sigla em inglês) são notificadas pelo despacho 1.1. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento a eventuais exigências e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI.. Número de Protocolo '870180007271' em 26/01/2018 17:39 (WB)" },
	{ codigo_despacho: "2.10", codigo_patente: "BR 10 2013 024870 3", num_revista: 2291, sequencia: 1, comentario: "O INPI confirma o recebimento de pedido de Patente de Invenção, Modelo de Utilidade ou Certificado de Adição de Invenção. Não é necessário responder a este despacho. O INPI fará, em seguida, o exame formal preliminar para verificar se o depositante atendeu às condições estabelecidas no Art. 19 da Lei 9.279/1996 e nas normas em vigor no Instituto. Se o depósito foi efetuado por procurador, este deverá apresentar a procuração no prazo de até 60 (sessenta) dias, a contar da data do depósito. Isso deve ser feito mesmo sem o INPI emitir notificação ou exigência, conforme o Art. 216 da Lei 9.279/1996. O pedido será arquivado definitivamente caso a procuração não seja apresentada no prazo previsto. As solicitações de entrada em fase nacional no Brasil via Tratado de Cooperação em Matéria de Patentes (PCT, na sigla em inglês) são notificadas pelo despacho 1.1. Atenção! O depositante deverá acompanhar o andamento do pedido na RPI e na Busca de Processos no Portal do INPI. Também deve estar atento a eventuais exigências e/ou necessidades do rito processual. Para tirar dúvidas, consulte os Guias Rápidos de Patentes ou escreva para o Fale Conosco no Portal do INPI.. Número de Protocolo 14130002000 em 27/09/2013 03:53(MG)." },
	{ codigo_despacho: "25.1", codigo_patente: "PI 0912486-1", num_revista: 2174, sequencia: 3, comentario: "Notificação do deferimento da transferência requerida. Desta data corre o prazo de 60 (sessenta) dias para eventual recurso do interessado.. Transferido parte dos Direitos de: Universidade Federal de Minas Gerais - UFMG" },
	{ codigo_despacho: "3.1", codigo_patente: "BR 10 2018 001781 0", num_revista: 2536, sequencia: 3, comentario: "Quando o período de sigilo (18 meses do depósito) é finalizado, o INPI publica o pedido de Patente ou de Certificado de Adição de Invenção, conforme previsto no Art. 30 da Lei nº 9.279/96. Os interessados podem acessar a documentação do pedido (relatório descritivo, reivindicações, desenhos - se for o caso - e resumo) na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O depositante ou qualquer interessado pode solicitar o exame do pedido de patente, caso isso ainda não tenha sido feito. O prazo é de 36 (trinta e seis) meses, contados da data do depósito. Para tal, o usuário deverá pagar a guia de recolhimento da união (GRU) de código 203 (Patente de Invenção), 204 (Modelo de Utilidade) ou 205 (Certificado de Adição de Invenção). Se o INPI já examinou o pedido internacional PCT como ISA/IPEA, o código é 284 (Patente de Invenção) ou 285 (Modelo de Utilidade). O pedido será arquivado se o pagamento não for feito no prazo previsto, conforme o Art.33 da Lei nº 9.279/96. O requerente tem o prazo de 60 (sessenta) dias contatos a partir da data do arquivamento para pagar a GRU de código 209 (Desarquivamento). O INPI arquivará o pedido definitivamente se o depositante não comprovar, no referido prazo, o pagamento dos dois serviços (desarquivamento e pedido de exame).." },
	{ codigo_despacho: "3.1", codigo_patente: "BR 10 2013 024870 3", num_revista: 2531, sequencia: 4, comentario: "Quando o período de sigilo (18 meses do depósito) é finalizado, o INPI publica o pedido de Patente ou de Certificado de Adição de Invenção, conforme previsto no Art. 30 da Lei nº 9.279/96. Os interessados podem acessar a documentação do pedido (relatório descritivo, reivindicações, desenhos - se for o caso - e resumo) na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O depositante ou qualquer interessado pode solicitar o exame do pedido de patente, caso isso ainda não tenha sido feito. O prazo é de 36 (trinta e seis) meses, contados da data do depósito. Para tal, o usuário deverá pagar a guia de recolhimento da união (GRU) de código 203 (Patente de Invenção), 204 (Modelo de Utilidade) ou 205 (Certificado de Adição de Invenção). Se o INPI já examinou o pedido internacional PCT como ISA/IPEA, o código é 284 (Patente de Invenção) ou 285 (Modelo de Utilidade). O pedido será arquivado se o pagamento não for feito no prazo previsto, conforme o Art.33 da Lei nº 9.279/96. O requerente tem o prazo de 60 (sessenta) dias contatos a partir da data do arquivamento para pagar a GRU de código 209 (Desarquivamento). O INPI arquivará o pedido definitivamente se o depositante não comprovar, no referido prazo, o pagamento dos dois serviços (desarquivamento e pedido de exame).." },
	{ codigo_despacho: "3.1", codigo_patente: "PI 0912486-1", num_revista: 2147, sequencia: 2, comentario: "Quando o período de sigilo (18 meses do depósito) é finalizado, o INPI publica o pedido de Patente ou de Certificado de Adição de Invenção, conforme previsto no Art. 30 da Lei nº 9.279/96. Os interessados podem acessar a documentação do pedido (relatório descritivo, reivindicações, desenhos - se for o caso - e resumo) na Busca de Processos (Portal do INPI). Não é necessário responder a este despacho. O depositante ou qualquer interessado pode solicitar o exame do pedido de patente, caso isso ainda não tenha sido feito. O prazo é de 36 (trinta e seis) meses, contados da data do depósito. Para tal, o usuário deverá pagar a guia de recolhimento da união (GRU) de código 203 (Patente de Invenção), 204 (Modelo de Utilidade) ou 205 (Certificado de Adição de Invenção). Se o INPI já examinou o pedido internacional PCT como ISA/IPEA, o código é 284 (Patente de Invenção) ou 285 (Modelo de Utilidade). O pedido será arquivado se o pagamento não for feito no prazo previsto, conforme o Art.33 da Lei nº 9.279/96. O requerente tem o prazo de 60 (sessenta) dias contatos a partir da data do arquivamento para pagar a GRU de código 209 (Desarquivamento). O INPI arquivará o pedido definitivamente se o depositante não comprovar, no referido prazo, o pagamento dos dois serviços (desarquivamento e pedido de exame).." },
	{ codigo_despacho: "6.1", codigo_patente: "PI 0912486-1", num_revista: 2600, sequencia: 5, comentario: "O INPI suspende o andamento do pedido de patente ou de certificado de adição de invenção. O objetivo é abrir prazo para atendimento ou contestação de exigências. O depositante deverá acessar o parecer na Busca de Processos (Portal do INPI). O prazo para cumprir a exigência é de 90 (noventa) dias corridos, contados a partir da data desta publicação. O depositante deverá apresentar ao INPI os documentos corrigidos, conforme solicitado no parecer. Além disso, precisa complementar o pagamento da retribuição de pedido de exame caso o número de reivindicações aumente quando cumprir a exigência. A complementação deverá estar de acordo com o valor estabelecido na tabela de retribuições para a natureza e a quantidade de reivindicações do pedido. O pagamento deverá ser feito por meio da Guia de Recolhimento da União (GRU) da Administração Geral de código 800 (complementação de retribuição). Em seguida, a pessoa deverá pagar a GRU de código 207 (cumprimento de exigência) para apresentar via peticionamento eletrônico toda a documentação solicitada, incluindo o comprovante de pagamento da GRU de código 800. O INPI arquivará o pedido definitivamente se o depositante não responder à exigência no prazo, conforme previsto no Art. 36 §1º da Lei nº 9.279/96 (LPI). Atenção! Não confunda o prazo de 90 dias com três meses, pois a contagem é feita por dias corridos.." },
	{ codigo_despacho: "6.22", codigo_patente: "PI 0912486-1", num_revista: 2579, sequencia: 4, comentario: "O INPI suspende o andamento do pedido. O objetivo é abrir prazo para o depositante atender ou contestar exigências. Para isso, deverá acessar o parecer na Busca de Processos (Portal do INPI). O prazo para cumprir a exigência é de 90 (noventa) dias corridos, contados a partir da data desta publicação. O depositante deverá apresentar ao INPI os documentos solicitados no parecer. Também deverá apresentar novas vias do quadro reivindicatório adequado à legislação vigente e se manifestar sobre o diferencial e as melhorias técnicas da invenção requerida em comparação com os documentos citados no relatório de busca. Se o número de reivindicações aumentar, o depositante deverá complementar o pagamento da retribuição pedido de exame até o valor estabelecido na tabela de retribuições vigente. Nesse caso, deverá anexar o comprovante de pagamento da GRU da Administração Geral de código 800 (complementação de retribuição). O depositante deverá usar o sistema de peticionamento eletrônico com a Guia de Recolhimento da União (GRU) de código 207 (cumprimento de exigência) para apresentar toda a documentação solicitada. O INPI arquivará o pedido definitivamente se o depositante não responder à exigência no prazo, conforme previsto no Art. 36 §1º da Lei nº 9.279/96 (LPI). Atenção! Não confunda o prazo de 90 dias com três meses, pois a contagem é feita por dias corridos.." },
	{ codigo_despacho: "6.6.1", codigo_patente: "BR 10 2013 024870 3", num_revista: 2533, sequencia: 5, comentario: "O INPI suspende o andamento do pedido de patente. O objetivo é abrir prazo para o depositante atender à exigência. Esse prazo é de 60 (sessenta) dias corridos, contados a partir da data desta publicação. O depositante deverá informar ao INPI se acessou o patrimônio genético nacional (PG) e/ou o conhecimento tradicional associado (CTA). Se houve acesso, o depositante deverá apresentar manifestação sobre cadastro ou autorização de acesso ao PG e/ou CTA junto ao Conselho de Gestão do Patrimônio Genético (CGen). Para isso, deverá usar o peticionamento eletrônico com a Guia de Recolhimento da União (GRU) de código 264 (declaração positiva de acesso). O INPI considerará que não houve acesso ao PG ou ao CTA se o depositante não responder à exigência no prazo. Atenção! Não confunda o prazo de 60 dias com dois meses, pois a contagem é feita por dias corridos. Exigência notificada a partir de 27/02/2018 para processos de patente depositados no INPI antes de 26/11/2015.." },
	{ codigo_despacho: "6.7", codigo_patente: "BR 10 2013 024870 3", num_revista: 2326, sequencia: 3, comentario: "O INPI suspende o andamento do pedido de patente ou de certificado de adição de invenção devido a pendências que impedem o exame. E abre prazo para o depositante contestar ou atender às exigências. Ele deverá verificar o parecer e/ou o texto complementar ao despacho na Busca de Processos (Portal do INPI). O prazo para cumprir a exigência é de 90 (noventa) dias corridos, contados a partir da data desta publicação. O depositante deverá apresentar ao INPI os documentos solicitados no parecer. O depositante deverá também anexar o comprovante de pagamento da GRU da Administração Geral de código 800 (complementação de retribuição), se for devida a complementação de retribuição. Nesse caso também deverá informar o Nosso Número da GRU 800 paga conforme a tabela de retribuições vigente. O depositante deverá usar o sistema de peticionamento eletrônico com a Guia de Recolhimento da União (GRU) de código 207 (cumprimento de exigência) para apresentar toda a documentação solicitada. O INPI arquivará o pedido definitivamente se o depositante não responder à exigência no prazo, conforme previsto no Art. 36 da Lei nº 9.279/96 (LPI). Atenção! Não confunda o prazo de 90 dias com três meses, pois a contagem é feita por dias corridos.. Apresente documento que comprove que o signatário da petição inicial possui poderes para representar os demais depositantes constituídos no formulário de depósito." },
	{ codigo_despacho: "8.6", codigo_patente: "BR 10 2018 001781 0", num_revista: 2759, sequencia: 4, comentario: "O INPI arquivou o pedido pela falta de pagamento(s) de retribuição anual (anuidade), por pagamento da retribuição anual fora do prazo ou pela falta de cumprimento de exigência de complementação de anuidade nos prazos estabelecidos na Lei nº 9.279/96 (LPI) e normativos específicos em vigor. O depositante deve acessar o parecer na Busca de Processos (Portal do INPI) para obter mais informações. O prazo para o depositante para requerer a restauração do pedido é de 3 (três) meses contados a partir da data desta publicação. Para isso, o depositante deverá pagar 1 (uma) Guia de Recolhimento da União (GRU) de código 208 (restauração) e obedecer aos critérios estabelecidos nesta notificação, na tabela de retribuições e nos normativos vigentes. Além disso, o depositante deverá pagar GRU(s) de anuidade no prazo extraordinário previsto no Art. 84º § 2º da LPI e/ou de complementação de retribuição (código 800 da Administração Geral) conforme citadas nesta notificação. Se as GRUs forem pagas por intermédio de procurador, este deverá apresentar a procuração do depositante de acordo com os Arts. 216 e 217 da LPI em até 60 (sessenta) dias contados da data do pagamento da GRU 208. O INPI manterá o arquivamento do pedido de forma definitiva, se o requerimento de restauração não atender aos critérios estabelecidos no Art. 15 da Portaria INPI PR n° 52/23, ensejando a aplicação do disposto no art. 17, da mesma portaria. Acesse no Portal do INPI: A LPI, demais normativos em vigor, a tabela de retribuições com os códigos das GRUs e o Sistema de Emissão de GRU.. Referente à 6ª anuidade." },
	{ codigo_despacho: "8.6", codigo_patente: "BR 10 2013 024870 3", num_revista: 2541, sequencia: 6, comentario: "O INPI arquivou o pedido pela falta de pagamento(s) de retribuição anual (anuidade), por pagamento da retribuição anual fora do prazo ou pela falta de cumprimento de exigência de complementação de anuidade nos prazos estabelecidos na Lei nº 9.279/96 (LPI) e normativos específicos em vigor. O depositante deve acessar o parecer na Busca de Processos (Portal do INPI) para obter mais informações. O prazo para o depositante para requerer a restauração do pedido é de 3 (três) meses contados a partir da data desta publicação. Para isso, o depositante deverá pagar 1 (uma) Guia de Recolhimento da União (GRU) de código 208 (restauração) e obedecer aos critérios estabelecidos nesta notificação, na tabela de retribuições e nos normativos vigentes. Além disso, o depositante deverá pagar GRU(s) de anuidade no prazo extraordinário previsto no Art. 84º § 2º da LPI e/ou de complementação de retribuição (código 800 da Administração Geral) conforme citadas nesta notificação. Se as GRUs forem pagas por intermédio de procurador, este deverá apresentar a procuração do depositante de acordo com os Arts. 216 e 217 da LPI em até 60 (sessenta) dias contados da data do pagamento da GRU 208. O INPI manterá o arquivamento do pedido de forma definitiva, se o requerimento de restauração não atender aos critérios estabelecidos no Art. 15 da Portaria INPI PR n° 52/23, ensejando a aplicação do disposto no art. 17, da mesma portaria. Acesse no Portal do INPI: A LPI, demais normativos em vigor, a tabela de retribuições com os códigos das GRUs e o Sistema de Emissão de GRU.. referente a 3ª anuidade" },
	{ codigo_despacho: "8.8", codigo_patente: "BR 10 2018 001781 0", num_revista: 2763, sequencia: 5, comentario: "O INPI anula despacho por ter sido indevido. O depositante deve acessar o parecer e/ou o texto complementar ao despacho na Busca de Processos (Portal do INPI) para ver o despacho que foi anulado e para conhecer os motivos de sua anulação. Não é necessário responder a este despacho.. Anulada a publicação código 8.6 na RPI nº 2759 de 21/11/2023 por ter sido indevida." },
	{ codigo_despacho: "9.1", codigo_patente: "PI 0912486-1", num_revista: 2621, sequencia: 6, comentario: "O INPI defere o pedido de patente ou de certificado de adição de invenção. O parecer técnico de decisão de deferimento do pedido está disponível na Busca de Processos (Portal do INPI). O depositante deverá pagar uma Guia de Recolhimento da União (GRU) de código 212 (expedição de carta-patente ou certificado de adição de invenção no prazo ordinário) dentro do prazo de até 60 (sessenta) dias corridos contados a partir da data desta publicação ou uma GRU de código 213 (expedição de carta-patente ou certificado de adição de invenção no prazo extraordinário) nos 30 (trinta) dias corridos subsequentes. O INPI não concederá a patente e arquivará o pedido definitivamente se o depositante não realizar o pagamento de GRU de retribuição de expedição de carta-patente nos referidos prazos estabelecidos no Artigo 38 da Lei nº 9.279/96 (LPI). Acesse no Portal do INPI: A LPI, a tabela de retribuições com os códigos das GRUs e o Sistema de Emissão de GRU.." }
];

module.exports = {
	/**
	 * Função de aplicação da semente
	 * @param {import("sequelize").QueryInterface} queryInterface
	 * @param {import("sequelize").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.bulkInsert("inventores", inventores, { transaction });
			await queryInterface.bulkInsert("titulares", titulares, { transaction });
			await queryInterface.bulkInsert("despachos", despachos, { transaction });
			await queryInterface.bulkInsert("patentes", patentes, { transaction });
			await queryInterface.bulkInsert("inventores_patentes", inventores_patentes, { transaction });
			await queryInterface.bulkInsert("titulares_patentes", titulares_patentes, { transaction });
			await queryInterface.bulkInsert("revistas", revistas, { transaction });
			await queryInterface.bulkInsert("despachos_patentes", despachos_patentes, { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	/**
	 * Função que desfaz a aplicação da semente
	 * @param {import("sequelize").QueryInterface} queryInterface
	 * @param {import("sequelize").Sequelize} Sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("despachos_patentes", {
			[Sequelize.Op.or]: despachos_patentes
		});

		await queryInterface.bulkDelete("revistas", {
			[Sequelize.Op.or]: revistas
		});

		await queryInterface.bulkDelete("titulares_patentes", {
			[Sequelize.Op.or]: titulares_patentes
		});

		await queryInterface.bulkDelete("inventores_patentes", {
			[Sequelize.Op.or]: inventores_patentes
		});

		await queryInterface.bulkDelete("patentes", {
			[Sequelize.Op.or]: patentes
		});

		await queryInterface.bulkDelete("despachos", {
			[Sequelize.Op.or]: despachos
		});

		await queryInterface.bulkDelete("titulares", {
			[Sequelize.Op.or]: titulares
		});

		await queryInterface.bulkDelete("inventores", {
			[Sequelize.Op.or]: inventores
		});
	}
};
