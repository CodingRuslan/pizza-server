const User = require('../models/userModel');
const crypto = require('crypto');
const async = require('async');
const Cookies = require('cookies');
const COOKIES_KEY = ["This is cookies key"];

exports.create_user_get = function(req, res) {
    res.render('registration', { title: 'registration', message: 'Регистрация'});
};
exports.create_user_post = function(req, res) {
    async.waterfall([
        function(callback) {
            User.getUserByLogin(req.body.login, function (err, res) {
                if (err){res.send(err)}
                callback(null, res);
            });
        }
    ], function (err, result) {
        if (result.length > 0) {
            res.send(`Пользователь с таким именем уже существует`);
        } else {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
            const new_user = new User(req.body);

            if (!new_user) {
                res.status(400).send({error:true, message: 'Please add name'})
            } else {

                User.createUser(new_user, function (err, user) {

                    if (err){res.send(err)}
                    res.send('Вы зарегистрированы');
                });
            }
        }
    });
};

exports.login_user_get = function(req, res) {
    res.render('login', { title: 'login', message: 'Аутентификация'});
};

exports.login_user_post = function(req, res) {
    async.waterfall([
        function(callback) {
            User.getUserByLogin(req.body.login, function (err, res) {
                if (err){res.send(err)}
                callback(null, res);
            });
        }
    ], function (err, result) {
        if (result.length < 1) {
            res.end();
        } else if(crypto.createHash('sha256').update(req.body.password).digest('hex') === result[0].pass) {
            let cookies = new Cookies(req, res, {keys: COOKIES_KEY});
            cookies.set('token', result[0].token, {signed: true});
            res.json(result[0]);
        } else {
            res.end()
        }
    });
};

exports.logOut = function (req, res) {
    let cookies = new Cookies(req, res, {keys: COOKIES_KEY});
    cookies.set('token',{signed: true});
    res.redirect("/");
};

exports.getToken = function (req, res) {
    let cookies = new Cookies(req, res, {keys: COOKIES_KEY});
    return cookies.get('token', {signed: true});
};
