const chalk = require("chalk");
const jsonDiff = require("json-diff");

const models = require("../database/models");

const downloadPatentes = require("./download-patentes");
const patentesCadastradas = require("./patentes-cadastradas");
const { SyncPatentes } = require("./sync/patentes");

async function sincronizaPatentes () {
	console.log("Sincronizando patentes...");
	const start = Date.now();
	const stats = { added: 0, updated: 0, deleted: 0 };
	let transaction;

	try {
		const patentesExistentes = await patentesCadastradas();
		const patentesBaixadas = await downloadPatentes();

		const diff = jsonDiff.diff(patentesExistentes, patentesBaixadas.diffFormat, { full: true });

		transaction = await models.sequelize.transaction();
		const syncPatentes = new SyncPatentes(transaction, patentesBaixadas.namesDict);

		for (const key in diff) {
			if (key.endsWith("__added")) {
				await syncPatentes.create(diff[key]);
				console.log("[In Transaction]", chalk.greenBright("Patente adicionada: " + diff[key].codigo));
				stats.added++;
				continue;
			}

			if (key.endsWith("__deleted")) {
				await syncPatentes.destroy(diff[key]);
				console.log("[In Transaction]", chalk.redBright("Patente removida: " + diff[key].codigo));
				stats.deleted++;
				continue;
			}

			const changed = await syncPatentes.update(diff[key]);
			if (changed) {
				console.log("[In Transaction]", chalk.yellowBright("Patente alterada: " + diff[key].codigo));
				stats.updated++;
			}
		}

		await transaction.commit();
		console.log(chalk.greenBright("[Transaction Committed] Patentes sincronizadas."), chalk.magentaBright(`Duração: ${(Date.now() - start) / 1000} segundos.`));
		console.log("Resultado da sincronização:", stats.added, "adicionada(s),", stats.updated, "alterada(s) e", stats.deleted, "removida(s).");
	} catch (error) {
		if (transaction) {
			await transaction.rollback();
			console.error("[Transaction Rolled Back] Erro ao sincronizar patentes:", error);
		} else {
			console.error("Erro ao sincronizar patentes:", error);
		}
	}
}

module.exports = { sincronizaPatentes };
