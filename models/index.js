const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

const fixedExtension = require('./fixedExtension');
const customeExtension = require('./customExtension');

db.FixedExtension = fixedExtension;
db.customeExtension = customeExtension;

Object.keys(db).forEach(async (modelName) => {
	await db[modelName].init(sequelize);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
