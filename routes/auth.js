// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Route for user registration
// router.post('/register', authController.register);

// // Route for user login
// router.post('/login', authController.login);

// // Route for getting user profile
// router.get('/profile', authController.getProfile);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST login
router.post('/login', authController.login);

module.exports = router;

