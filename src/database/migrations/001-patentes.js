"use strict";

/**
 * @type {import("sequelize-cli").Migration}
 */
module.exports = {
	/**
	 * Função de aplicação da migração
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("patentes", {
			codigo: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false
			},
			nome: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			data_deposito: {
				type: Sequelize.DATEONLY,
				allowNull: false
			},
			resumo: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			status: {
				type: Sequelize.ENUM("ARQUIVADO", "EM_ANDAMENTO", "CONCEDIDO"),
				allowNull: false
			},
			tipo: {
				type: Sequelize.ENUM("PATENTE", "PROGRAMA"),
				allowNull: false
			},
			linguagens: {
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
		await queryInterface.dropTable("patentes");
	}
};
