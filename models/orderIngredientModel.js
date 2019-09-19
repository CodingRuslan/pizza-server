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


OrderIngredient.getOrderIngredientById = function(orderId, result) {
	con.query("Select * from clientIngredients where orderId = ?", orderId, function (err, res) {
		if (err) {
			console.log("error", err);
			result(err, null);
		} else {
			let ingredientList = res.map((e) => {
				return e.ingredientId
			});
			// console.log(ingredientList);
			result(null, ingredientList)
		}
	});
};

module.exports = OrderIngredient;
