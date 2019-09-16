const async = require('async');
const con = require('../db');

exports.orderHandler = (req, res, next) =>  {
    if (req.length < 1) {console.log('you should make a order'); return}
    async.waterfall([
        function(callback) {
            let resTime = 0;
            con.query("SELECT * FROM ingredients\n" +
                `where idingredients IN (${req.cartItems.join(',')})`, (err, result) => {
                result.forEach((e) => {
                    resTime += e.timeCook;
                });
                callback(null, resTime)
            });

        },
        function (resTime, callback) {
            let valStr ="INSERT INTO clientIngredients (orderId, ingredientId) VALUES ";
            con.query("INSERT INTO `pizzadb`.`clientOrder` (`userId`, `cookId`, `orderDone`, `timeCooking`) " +
                `VALUES ('${req.userId}', '1', '0', '${resTime}');`, (err, result) => {
                req.cartItems.forEach((e) => {
                    valStr += `(${result.insertId}, ${e}),`;
                });

                con.query(valStr.substring(0, valStr.length - 1));
                callback(null, [result.insertId, resTime]);
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