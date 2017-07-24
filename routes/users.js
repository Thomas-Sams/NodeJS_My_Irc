var express = require('express');
var router = express.Router();
var Users = require('../schema/users.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
	if(!req.session.login) {
		res.redirect('/');
	} else {
		Users.find({ login: req.session.login }, function(err, user) {
			var login = user[0].login;
			var email = user[0].email;
			res.render('account', { title: 'Accueil - My Irc', login: login, email: email });
		});
	}
});

router.get('/register', function(req, res, next) {
	if(req.session.login) {
		res.redirect('/');
	} else {
		res.render('register', { title : 'Accueil - My Irc' });
	}
});

router.post('/register', function(req, res, next){
  Users.find({ login : req.body.login }, function(err, user){
  	if(user.length == 0){
	  	bcrypt.hash(req.body.password, 10, function(err,hash){
	  		Users.create({ login: req.body.login, email: req.body.email, password: hash });
	  	});
	}
  });
  res.render('register');
});

router.get('/login', function(req, res, next) {
	if(req.session.login) {
		res.redirect('/');
	} else {
		res.render('login', { title : 'Accueil - My Irc' });
	}
});

router.post('/login', function(req, res, next){
	Users.find({ login : req.body.login }, function(err, user){
		if(err) throw(err);
  		if(user.length > 0) {
  			bcrypt.compare(req.body.password, user[0].password, function(err, result){
				if(result){
					req.session.login = req.body.login;
					req.session.save();
					res.redirect('/');
				}
			});
		}
		else {
			res.render('login', { title: 'Login - My Irc'});
		}
	});
});

router.get('/logout', function(req, res, next){
	if(req.session.login){
		req.session.destroy();
		res.redirect('/users/register');
	} else {
		res.redirect('/users/register');
	}
});

module.exports = router;