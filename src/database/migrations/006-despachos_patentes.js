"use strict";

/**
 * @type {import("sequelize-cli").Migration}
 */
module.exports = {
	/**
	 * Função de aplicação da migração
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("despachos_patentes", {
			id_despacho_patente: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			codigo_despacho: {
				type: Sequelize.STRING,
				allowNull: false,
				references: { model: "despachos", key: "codigo" }
			},
			codigo_patente: {
				type: Sequelize.STRING,
				allowNull: false,
				references: { model: "patentes", key: "codigo" }
			},
			num_revista: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "revistas", key: "num_revista" }
			},
			sequencia: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			comentario: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW")
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW")
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},

	/**
	 * Função que desfaz a migração
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("despachos_patentes");
	}
};
