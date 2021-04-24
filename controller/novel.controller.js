const db = require('../db.js')

module.exports.showData = function(req, res) {
	console.log(db.get('users').value());

	res.render('novel/show', {
		novels: db.get('novels').value()
	});
}

module.exports.create = function(req, res) {
	res.render('novel/create');
}

module.exports.postCreate = function(req, res) {
	req.body.avatar = req.file.path.split('/').slice(1).join('/');

	db.get('novels').push(req.body).write();
	res.redirect('/novel/show');
}