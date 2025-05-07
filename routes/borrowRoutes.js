// borrowRoutes.js
const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const authenticateToken = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateInput');
const borrowSchema = require('../schemas/borrowSchema');

// Tambah peminjaman baru (dengan validasi)
router.post('/', authenticateToken, validate(borrowSchema), borrowController.createBorrow);

module.exports = router;
