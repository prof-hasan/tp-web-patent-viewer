# Requisitos de Boas Práticas

- Definição de uma estrutura de pastas bem organizada e padronizada para o projeto

- Utilização de mecanismos de padronização de código

	- [ESLint](https://eslint.org/) e [EditorConfig](https://editorconfig.org/)

	- As regras específicas podem ser encontradas nos arquivos abaixo:

		- ESLint do back-end: [.eslintrc.json](/.eslintrc.json)

		- ESLint do front-end: [src/front-end/.eslintrc.json](/src/front-end/.eslintrc.json)

		- EditorConfig do projeto todo: [.editorconfig](/.editorconfig)

- Tipagem das estruturas de dados utilizadas, via [JSDoc](https://jsdoc.app/) no back-end e TypeScript no front-end

- Utilização do [ORM Sequelize](https://sequelize.org/) para deixar o sistema facilmente compatível com vários SGBD

	- Criação da estrutura do banco de dados relacional via migrações gerenciadas pelo ORM

	- Documentação da estrutura do banco de dados via [DBML](https://dbml.dbdiagram.io/home/) e [diagrama](https://dbdiagram.io/home)

- Utilização do [PM2](https://pm2.keymetrics.io/) para implantação, garantindo máxima disponibilidade do servidor

	- Uso do [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) para armazenamento de logs em arquivos de tamanho limitado e catalogados por data

- Uso de [estampas de tempo nos logs](https://www.npmjs.com/package/console-stamp)

- Uso de [logs para todas as requisições](https://www.npmjs.com/package/morgan) recebidas pelo servidor junto com o status HTTP

- Definição de um [cron-job](https://www.npmjs.com/package/node-cron) para agendar a execução da lógica de download de novos dados

- Validações e “sanitização” dos valores dos parâmetros recebidos nas requisições da API

	- [express-validator](https://express-validator.github.io/docs/)

- Escrita de documentação ao menos para as funções mais importantes e complexas do sistema

## Implementação de Testes Automatizados

Para validação da solução serão implementados testes unitários para garantir o correto funcionamento das rotas do back-end.

Para isso, pretende-se utilizar o **Jest** como framework de testes e o **SuperTest** como ferramenta para realização das requisições HTTP cujas respostas serão validadas.

Por não se tratar de um sistema muito grande, pretende-se implementar um teste unitário para cada uma das rotas da API, sendo elas citadas abaixo:

- **/statistics/status**: obtém a contagem de patentes por tipo e status;

- **/statistics/requests/yearly**: obtém a quantidade de solicitações/depósitos por ano;

- **/statistics/top-inventors/20**: obtém o ranking dos 20 maiores inventores;

- **/statistics/top-holders/20**: obtém o ranking dos 20 maiores titulares;

- **/statistics/recent-requests/20**: obtém as 20 solicitações/depósitos mais recentes;

- **/patents/filter**: realiza uma pesquisa por patentes ou programas de computador;

- **/patents/details/:code**: obtém todas as informações de uma dada patente ou programa de computador com base no parâmetro `:code`.
