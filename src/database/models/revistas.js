const { Model, DataTypes } = require("sequelize");

class Revistas extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Revistas.hasMany(models.DespachosPatentes, { as: "despachosPatentes", foreignKey: "numRevista" });
		Revistas.belongsToMany(models.Despachos, { as: "despachos", through: models.DespachosPatentes, foreignKey: "numRevista" });
		Revistas.belongsToMany(models.Patentes, { as: "patentes", through: models.DespachosPatentes, foreignKey: "numRevista" });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initRevistas (sequelize) {
	Revistas.init({
		numRevista: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		dataPublicacao: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: true,
		timestamps: true,
		underscored: true,
		modelName: "Revistas",
		tableName: "revistas"
	});

	return Revistas;
}

module.exports = initRevistas;
