const con = require('../db');
const Order = require('../models/orderModel');

exports.orderHandler = (req, res, next) =>  {
    if (req.length < 1) {console.log('you should make a order'); return}
        con.query("INSERT INTO `pizzadb`.`clientOrder` (`userId`, `cookId`, `orderDone`, `timeCooking`) " +
            `VALUES ('${req.userId}', '1', '0', '${req.timeCooking}');`, (err, result) => {
            req.cartItems.forEach((e) => {
                con.query(`INSERT INTO clientIngredients (orderId, ingredientId)  VALUES (${result.insertId}, ${e})`)
            });
            setTimeout(() => {
                Order.updateStatusOrder(result.insertId, (result) => {
                    console.log(result);
                })
            }, req.timeCooking * 1000);
            res.json(result.insertId);
        })
};
