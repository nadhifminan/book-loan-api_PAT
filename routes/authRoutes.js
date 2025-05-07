// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // pastikan sudah diimport controller yang benar

// Pastikan handler di sini adalah fungsi yang valid
router.post('/login', authController.login);  // pastikan `authController.login` adalah fungsi yang valid
router.post('/register', authController.register);  // pastikan `authController.register` adalah fungsi yang valid

module.exports = router;
