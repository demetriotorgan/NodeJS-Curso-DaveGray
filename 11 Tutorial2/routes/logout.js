const express = require('express');
const router = express.Router();
const logOutController = require('../controllers/logoutController');

router.get('/', logOutController.handleLogOut);

module.exports = router;