const express = require('express');
const db = require("../models");
const router = express.Router();

const { FixedExtension, CustomeExtension } = db;

const findExt = (name, type="fixed") => {
	return new Promise(async (resolve, reject) => {
		let ext;
		if (type === "fixed") {
			ext = await FixedExtension.findOne({
				where: { name }
			});
		}
		else {
			ext = await CustomeExtension.findOne({
				where: { name }
			});
		}
		if (ext) {
			resolve(true);
		}
		else {
			reject(new Error('해당 확장자를 찾을 수 없습니다.'));
		}
	})
}

const updateCheck = (name, check, t) => {
	return new Promise(async (resolve, reject) => {
		try {
			await FixedExtension.update({
				is_ban: check
			}, {
				where: {
					name
				}
			}, {
				transaction: t
			});
			resolve(true);
		} catch(err) {
			reject(err);
		}
	})
}

router.get('/add/:extension_name', async (req, res, next) => {
	const name = req.params.extension_name;

	if (name.length === 0 || name.length > 20) {
		next(new Error('확장자 명 길이가 적절하지 않습니다. (1~20자)'));
	}

	const t = await db.sequelize.transaction();

	try {
		if (await CustomeExtension.count() > 199) {
			return res.status(400).send({ message: "확장자를 추가할 수 없습니다. 확장자는 최대 200개까지 추가 가능합니다." });
		}

		const dupExt = await CustomeExtension.findOne({
			where: {
				name
			}
		});

		if (dupExt) {
			res.status(400).send({ message: "동일한 이름의 확장자가 존재합니다." });
		}
		else {
			await CustomeExtension.create({
				name
			}, {
				transaction: t
			});
			await t.commit();
			res.send('add done');
		}
	}
	catch (err) {
		await t.rollback();
		next(err);
	}
})

router.get('/delete/:extension_name', async (req, res, next) => {
	const t = await db.sequelize.transaction();
	try {
		await findExt(req.params.extension_name, 'custom');
		await CustomeExtension.destroy({
			where: {
				name: req.params.extension_name
			}
		}, {
			transaction: t
		});
		await t.commit();
		res.send('delete done');
	}
	catch (err) {
		await t.rollback();
		res.status(404).send('찾을 수 없는 확장자입니다.');
	}
})

router.get('/check/:extension_name', async (req, res, next) => {
	const t = await db.sequelize.transaction();
	try {
		await findExt(req.params.extension_name, 'fixed');
		await updateCheck(req.params.extension_name, true, t);
		await t.commit();
		res.send('check done');
	}
	catch (err) {
		await t.rollback();
		next(err);
	}
})

router.get('/uncheck/:extension_name', async (req, res, next) => {
	const t = await db.sequelize.transaction();
	try {
		await findExt(req.params.extension_name, 'fixed');
		await updateCheck(req.params.extension_name, false, t);
		await t.commit();
		res.send('check done');
	}
	catch (err) {
		await t.rollback();
		next(err);
	}
})

module.exports = router;
