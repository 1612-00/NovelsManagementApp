const db = require('../db.js')

module.exports.authLogin = function(req, res, next) {
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get('users').find({ id: req.signedCookies.userId }).value();

	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	next();
}