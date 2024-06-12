"use strict";

/**
 * @type {import("sequelize-cli").Migration}
 */
module.exports = {
	/**
	 * Função de aplicação da migração
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("titulares_patentes", {
			id_titular_patente: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			id_titular: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "titulares", key: "id_titular" }
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
		await queryInterface.dropTable("titulares_patentes");
	}
};
