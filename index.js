const express = require('express');
const path = require('path');
const router = require('./routes');
const { sequelize } = require("./models");

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

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render(__dirname + '/views/main.ejs', {data: dummy});
})

app.use('/assets', express.static(path.join(__dirname, "assets")));

app.use('/api', router);

app.listen(app.get('port'), () => {
	console.log(`http://localhost:${app.get('port')} is online`);
});
