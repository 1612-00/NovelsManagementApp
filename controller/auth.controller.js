var db = require('../db.js')
var md5 = require('md5')

module.exports.login = function(req, res) {
	res.render('auth/login');
}

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email }).value();

	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist!'
			],
			value: req.body
		});
		return;
	}

	var hashedPassword = md5(password);

	console.log(password, hashedPassword)

	if(user.password !== hashedPassword) {
		res.render('auth/login', {
			errors: [
				'Wrong password!'
			], 
			value: req.body
		});
		return;
	}

	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/novel/show');
}