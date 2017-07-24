var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {	
	if(req.session.login) {
		res.render('index', { title : 'Accueil - My Irc', login: req.session.login });
	} else {
		res.redirect('/users/login');
	}
});

module.exports = router;
