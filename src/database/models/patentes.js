const { Model, DataTypes } = require("sequelize");

class Patentes extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Patentes.hasMany(models.DespachosPatentes, { as: "despachosPatente", foreignKey: "codigoPatente" });
		Patentes.hasMany(models.InventoresPatentes, { as: "inventoresPatente", foreignKey: "codigoPatente" });
		Patentes.hasMany(models.TitularesPatentes, { as: "titularesPatente", foreignKey: "codigoPatente" });
		Patentes.belongsToMany(models.Despachos, { as: "despachos", through: models.DespachosPatentes, foreignKey: "codigoPatente" });
		Patentes.belongsToMany(models.Inventores, { as: "inventores", through: models.InventoresPatentes, foreignKey: "codigoPatente" });
		Patentes.belongsToMany(models.Titulares, { as: "titulares", through: models.TitularesPatentes, foreignKey: "codigoPatente" });
		Patentes.belongsToMany(models.Revistas, { as: "revistas", through: models.DespachosPatentes, foreignKey: "codigoPatente" });
	}
}

/**
 * Cria o modelo da tabela
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initPatentes (sequelize) {
	Patentes.init({
		codigo: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},
		nome: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		dataDeposito: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		resumo: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM("ARQUIVADO", "EM_ANDAMENTO", "CONCEDIDO"),
			allowNull: false
		},
		tipo: {
			type: DataTypes.ENUM("PATENTE", "PROGRAMA"),
			allowNull: false
		},
		linguagens: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		sequelize,
		paranoid: true,
		timestamps: true,
		underscored: true,
		modelName: "Patentes",
		tableName: "patentes"
	});

	return Patentes;
}

module.exports = initPatentes;
