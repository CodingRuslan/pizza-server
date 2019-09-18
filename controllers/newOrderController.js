const async = require('async');
const con = require('../db');

exports.orderHandler = (req, res, next) =>  {
    if (req.length < 1) {console.log('you should make a order'); return}
    async.waterfall([
        function (callback) {
            con.query("INSERT INTO `pizzadb`.`clientOrder` (`userId`, `cookId`, `orderDone`, `timeCooking`) " +
                `VALUES ('${req.userId}', '1', '0', '${req.timeCooking}');`, (err, result) => {
                req.cartItems.forEach((e) => {
                    con.query(`INSERT INTO clientIngredients (orderId, ingredientId)  VALUES (${result.insertId}, ${e})`)
                });
                callback(null, [result.insertId, req.timeCooking]);
            })
        }
    ],
    // optional callback
function(err, results) {
        setTimeout(() => {
            console.log(`Order ${results[0]} is ready`);
            con.query("UPDATE `pizzadb`.`clientOrder` SET `orderDone` = '1' WHERE (`idclientOrder` = ?);", results[0]);

            return res.json(results[0])
        }, results[1] * 1000);
    });

};
