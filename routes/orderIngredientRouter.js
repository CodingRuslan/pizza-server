const express = require('express');
const router = express.Router();
const order_ingredient_controller = require('../controllers/orderIngredientController');

router.post('/create', order_ingredient_controller.create_order_ingredient_post);

router.get('/:idorderingredient', order_ingredient_controller.read_a_order_ingredient);

module.exports = router;