const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function setup () {
	try { await teardown(); } catch (_) {}

	await exec("dotenv -e .env.tests sequelize db:create");
	await exec("dotenv -e .env.tests sequelize db:migrate");
	await exec("dotenv -e .env.tests sequelize db:seed:all");
}

async function teardown () {
	await exec("dotenv -e .env.tests sequelize db:drop");
}

module.exports = { setup, teardown };
