// Configura variáveis de ambiente o mais cedo possível
require("dotenv").config();

const cron = require("node-cron");

const { app } = require("./app");
const { sincronizaPatentes } = require("./job");

app.listen(app.get("port"), () => {
	console.log("Server is listening at", app.get("port"));
});

// Cria o job de sincronização de patentes para rodar todos os dias às 02:00:00
cron.schedule("0 0 2 * * *", sincronizaPatentes);
sincronizaPatentes();
