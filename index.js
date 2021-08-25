const express = require('express');
const path = require('path');
const router = require('./routes');
const { sequelize } = require("./models");
const db = require('./models');

const app = express();

sequelize.sync()
	.then(() => {
		console.log('✓ DB connection success.');
		console.log('  Press CTRL-C to stop\n');
	})
	.catch(err => {
		console.error(err);
		console.log('✗ DB connection error. Please make sure DB is running.');
		process.exit();
	});

db.init();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, "assets")));

app.use('/api', router);

app.get('/', async (req, res) => {
	const data = {};

	data.fixed_extension = await db.FixedExtension.findAll();
	data.custom_extension = await db.CustomeExtension.findAll();

	res.render(__dirname + '/views/main.ejs', { data });
});

app.use('/404', (req, res, next) => {
	res.render(__dirname + '/views/404.ejs');
});

app.use('/error', (req, res, next) => {
	res.render(__dirname + '/views/error.ejs', {error: {message: '알 수 없는 오류가 발생했습니다.'}});
});

app.use((req, res, next) => {
	res.send({status: 404, message: 'URL을 확인해주십시오.'});
});

app.use((err, req, res, next) => {
	res.status(500);
	res.render('error', { error: err });
});

app.listen(app.get('port'), () => {
	console.log(`http://localhost:${app.get('port')} is online`);
});
