"use strict";

/**
 * @type {import("sequelize-cli").Migration}
 */
module.exports = {
	/**
	 * Função de aplicação da migração
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("inventores_patentes", {
			id_inventor_patente: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			id_inventor: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "inventores", key: "id_inventor" }
			},
			codigo_patente: {
				type: Sequelize.STRING,
				allowNull: false,
				references: { model: "patentes", key: "codigo" }
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
		await queryInterface.dropTable("inventores_patentes");
	}
};
