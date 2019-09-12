const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ordersController = require('../controllers/newOrderController');
const urlencodedParser = bodyParser.urlencoded({extend: false});

router
    // .get('/', function(req, res, next) {
    //     res.render('createOrder', { title: 'order', message: 'Menu'});
    // })
    .post('/', function (req, res, next) {
        ordersController.orderHandler(req.body, res);
    });

module.exports = router;