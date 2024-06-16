const { Model, DataTypes } = require("sequelize");

class Titulares extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Titulares.hasMany(models.TitularesPatentes, { as: "titularPatentes", foreignKey: "idTitular" });
		Titulares.belongsToMany(models.Patentes, { as: "patentes", through: models.TitularesPatentes, foreignKey: "idTitular" });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initTitulares (sequelize) {
	Titulares.init({
		idTitular: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	}, {
		sequelize,
		paranoid: true,
		timestamps: true,
		underscored: true,
		modelName: "Titulares",
		tableName: "titulares"
	});

	return Titulares;
}

module.exports = initTitulares;
