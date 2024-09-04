module.exports = {
	development: {
		host: "127.0.0.1",
		port: 5432,
		username: "postgres",
		password: "root",
		database: "patent_viewer_dev",
		dialect: "postgres",
		logging: false
	},
	test: {
		host: "127.0.0.1",
		port: 5432,
		username: "postgres",
		password: "root",
		database: "patent_viewer_test",
		dialect: "postgres",
		logging: false
	}
};
