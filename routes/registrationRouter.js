const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/usersController');

router.get('/', user_controller.create_user_get);
router.post('/', user_controller.create_user_post);

module.exports = router;