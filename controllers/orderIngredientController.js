const OrderIngredient = require('../models/orderIngredientModel');
const ingredient_controller = require('../controllers/ingredientsController');

exports.create_order_ingredient_post = function(req, res) {
	const new_orderIngredient = new OrderIngredient(req.body);

	if (!new_orderIngredient) {
		res.status(400).send({error:true, message: 'Please add name'})
	} else {

		OrderIngredient.createOrderIngredient(new_orderIngredient, function (err, orderIngredient) {
			if (err){res.send(err)}
			res.json(orderIngredient);
		});
	}
};

exports.read_a_order_ingredient = function(req, res) {
	OrderIngredient.getOrderIngredientById(req.params.orderId, function(err, orderIngredient) {
		if (err)
			res.send(err);
		res.json(orderIngredient);

	});
};

