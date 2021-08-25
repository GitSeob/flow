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
db.CustomeExtension = customeExtension;

Object.keys(db).forEach(async (modelName) => {
	await db[modelName].init(sequelize);
});

const init = async () => {
	const fixedExts = ['bat', 'cmd','com','cpl', 'exe', 'scr', 'js'];

	while(!db.FixedExtension.sync() && !db.FixedExtension.sync()) {
		setTimeout(
			() => {console.log('wait for create table...')}
			, 200);
	}

	const fixedExtsInDB = await fixedExtension.findAll();

	if (!fixedExtsInDB.length) {
		console.log('create datas');
		const t = await db.sequelize.transaction();

		await fixedExtension.bulkCreate(
			fixedExts.map((ext) => ({ is_ban: false, name: ext })),
			{ transaction: t }
		);
		await t.commit();
	}
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.init = init;

module.exports = db;
