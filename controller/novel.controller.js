const db = require('../db.js')
const shortid = require('shortid');

module.exports.showData = function(req, res) {
	res.render('novel/show', {
		novels: db.get('novels').value()
	});
}

module.exports.create = function(req, res) {
	res.render('novel/create');
}

module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('/').slice(1).join('/');

	db.get('novels').push(req.body).write();
	res.redirect('/novel/show');
}

module.exports.view = function(req, res) {
	var id = req.params.id;

	var novel = db.get('novels').find({ id: id }).value();

	res.render('novel/viewMore', {
		novel: novel
	});
}

module.exports.search = function(req, res) {
	var input = req.query.q;

	var novels = db.get('novels').value();

	var filteredNovels = novels.filter(function(novel) {
		return novel.name.toLowerCase().indexOf(input.toLowerCase()) !== -1;
	});

	res.render('novel/show', {
		novels: filteredNovels, 
		input: input
	})
}