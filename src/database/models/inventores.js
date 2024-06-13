const { Model, DataTypes } = require("sequelize");

class Inventores extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Inventores.hasMany(models.InventoresPatentes, { as: "inventorPatentes", foreignKey: "idInventor" });
		Inventores.belongsToMany(models.Patentes, { as: "patentes", through: models.InventoresPatentes });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initInventores (sequelize) {
	Inventores.init({
		idInventor: {
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
		modelName: "Inventores",
		tableName: "inventores"
	});

	return Inventores;
}

module.exports = initInventores;
