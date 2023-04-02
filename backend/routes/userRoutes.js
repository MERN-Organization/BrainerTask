const express = require('express');
const router = express.Router();
const { registerUsers, loginUser } = require('../controllers/userController');

router.post('/register', registerUsers);

router.post('/login', loginUser);

module.exports = router;
