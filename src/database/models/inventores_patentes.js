const { Model, DataTypes } = require("sequelize");

class InventoresPatentes extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		InventoresPatentes.belongsTo(models.Inventores, { as: "inventor", foreignKey: "idInventor" });
		InventoresPatentes.belongsTo(models.Patentes, { as: "patente", foreignKey: "codigoPatente" });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initInventoresPatentes (sequelize) {
	InventoresPatentes.init({
		idInventorPatente: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		idInventor: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		codigoPatente: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: true,
		timestamps: true,
		underscored: true,
		modelName: "InventoresPatentes",
		tableName: "inventores_patentes"
	});

	return InventoresPatentes;
}

module.exports = initInventoresPatentes;
