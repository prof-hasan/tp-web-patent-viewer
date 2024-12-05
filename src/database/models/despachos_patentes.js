const { Model, DataTypes } = require("sequelize");

class DespachosPatentes extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		DespachosPatentes.belongsTo(models.Despachos, { as: "despacho", foreignKey: "codigoDespacho" });
		DespachosPatentes.belongsTo(models.Patentes, { as: "patente", foreignKey: "codigoPatente" });
		DespachosPatentes.belongsTo(models.Revistas, { as: "revista", foreignKey: "numRevista" });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initDespachosPatentes (sequelize) {
	DespachosPatentes.init({
		idDespachoPatente: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		codigoDespacho: {
			type: DataTypes.STRING,
			allowNull: false
		},
		codigoPatente: {
			type: DataTypes.STRING,
			allowNull: false
		},
		numRevista: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		sequencia: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		comentario: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		sequelize,
		paranoid: true,
		timestamps: true,
		underscored: true,
		modelName: "DespachosPatentes",
		tableName: "despachos_patentes"
	});

	return DespachosPatentes;
}

module.exports = initDespachosPatentes;
