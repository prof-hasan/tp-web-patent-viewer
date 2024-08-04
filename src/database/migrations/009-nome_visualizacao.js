"use strict";

/**
 * @type {import("sequelize-cli").Migration}
 */
module.exports = {
	/**
	 * Função de aplicação da migração
	 */
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn("titulares", "nome_visualizacao", {
				type: Sequelize.STRING,
				allowNull: false
			}, { transaction });

			await queryInterface.addColumn("inventores", "nome_visualizacao", {
				type: Sequelize.STRING,
				allowNull: false
			}, { transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	/**
	 * Função que desfaz a migração
	 */
	down: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.removeColumn("inventores", "nome_visualizacao", { transaction });
			await queryInterface.removeColumn("titulares", "nome_visualizacao", { transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
