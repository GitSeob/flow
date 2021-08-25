const DataTypes = require('sequelize');
const db = require('.');
const { Model } = DataTypes;

module.exports = class FixedExtension extends Model {
	static init(sequelize) {
		return super.init({
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true
			}
		}, {
			modelName: "FixedExtension",
			tableName: "fixedExtension",
			charset: "utf8mb4",
			collate: "utf8mb4_general_ci",
			sequelize
		})
	}
}
