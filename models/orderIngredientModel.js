const con = require('../db');

const OrderIngredient = function (orderIngredient) {
	this.orderId = orderIngredient.orderId;
	this.ingredientId = orderIngredient.ingredientId;
};
OrderIngredient.createOrderIngredient = function (neworderIngredient, result) {
	con.query("INSERT INTO clientIngredients set ?", neworderIngredient, function (err, res) {

		if (err) {
			console.log('error:', err);
			result(err, null)
		} else {
			result(null, res.insertId);
		}

	});
};


OrderIngredient.getOrderIngredientById = function(orderIngredientId, result) {
	con.query("Select * from clientIngredients where idclientIngredients = ?", orderIngredientId, function (err, res) {
		if (err) {
			console.log("error", err);
			result(err, null);
		} else {
			result(null, res)
		}
	});
};

module.exports = OrderIngredient;