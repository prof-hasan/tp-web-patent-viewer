const util = require("util");
const exec = util.promisify(require("child_process").exec);

/**
 * @type { import("sequelize").Sequelize | undefined }
 */
let sequelize;

/**
 * @type { import("http").Server | undefined }
 */
let server;

async function setup () {
	try { await teardown(); } catch (_) {}

	await exec("dotenv -e .env.tests sequelize db:create");
	await exec("dotenv -e .env.tests sequelize db:migrate");
	await exec("dotenv -e .env.tests sequelize db:seed:all");

	// App is used with supertest to simulate server request
	const { app } = require("../app");

	// Import sequelize to disconnect from database after the tests
	sequelize = require("../database/models").sequelize;

	server = app.listen(app.get("port"), () => {
		console.log("Test server is listening at", app.get("port"));
	});

	return server;
}

async function teardown () {
	if (server)
		await new Promise(resolve => server.close(resolve));

	if (sequelize)
		await sequelize.close();

	await exec("dotenv -e .env.tests sequelize db:drop");
}

module.exports = { setup, teardown };
