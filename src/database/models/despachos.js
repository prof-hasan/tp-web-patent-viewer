const { Model, DataTypes } = require("sequelize");

class Despachos extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Despachos.hasMany(models.DespachosPatentes, { as: "despachoPatentes", foreignKey: "codigoDespacho" });
		Despachos.belongsToMany(models.Patentes, { as: "patentes", through: models.DespachosPatentes });
		Despachos.belongsToMany(models.Revistas, { as: "revistas", through: models.DespachosPatentes });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initDespachos (sequelize) {
	Despachos.init({
		codigo: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},
		titulo: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: true,
		timestamps: true,
		underscored: true,
		modelName: "Despachos",
		tableName: "despachos"
	});

	return Despachos;
}

module.exports = initDespachos;
