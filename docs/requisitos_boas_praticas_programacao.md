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
