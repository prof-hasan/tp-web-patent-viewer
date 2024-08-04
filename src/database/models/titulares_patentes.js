const { Model, DataTypes } = require("sequelize");

class TitularesPatentes extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		TitularesPatentes.belongsTo(models.Titulares, { as: "titular", foreignKey: "idTitular" });
		TitularesPatentes.belongsTo(models.Patentes, { as: "patente", foreignKey: "codigoPatente" });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initTitularesPatentes (sequelize) {
	TitularesPatentes.init({
		idTitularPatente: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		idTitular: {
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
		modelName: "TitularesPatentes",
		tableName: "titulares_patentes"
	});

	return TitularesPatentes;
}

module.exports = initTitularesPatentes;
