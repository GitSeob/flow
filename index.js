const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render(__dirname + '/views/main.ejs', {data: dummy});
})

app.use('/assets', express.static(path.join(__dirname, "assets")));

const router = express.Router();

router.get('/add/:extension_name', (req, res) => {
	dummy.custom_extension.push({id: 999, name: req.params.extension_name });
	console.log(dummy.custom_extension);
});

app.use('/api', router);

app.listen(app.get('port'), () => {
	console.log(`http://localhost:${app.get('port')} is online`);
});

const dummy = {
	fixed_extension: [
		{
			id: 1,
			name: "bat",
			is_ban: true
		},
		{
			id: 2,
			name: "cmd",
			is_ban: true
		},
		{
			id: 3,
			name: "com",
			is_ban: true
		},
		{
			id: 4,
			name: "cpi",
			is_ban: true
		},
		{
			id: 5,
			name: "exe",
			is_ban: true
		},
		{
			id: 6,
			name: "scr",
			is_ban: false
		},
		{
			id: 7,
			name: "js",
			is_ban: false
		},
	],
	custom_extension: []
}
