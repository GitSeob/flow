const DataTypes = require('sequelize');
const db = require('.');
const { Model } = DataTypes;

module.exports = class CustomExtension extends Model {
	static init(sequelize) {
		return super.init({
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true
			},
			is_ban: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		}, {
			modelName: "CustomeExtension",
			tableName: "customExtension",
			charset: "utf8mb4",
			collate: "utf8mb4_general_ci",
			sequelize
		})
	}
}
