const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET semua buku
router.get('/', authMiddleware, bookController.getAllBooks);

// POST tambah buku tanpa Joi, menggunakan validasi manual
router.post('/', authMiddleware, (req, res, next) => {
  const { title, author } = req.body;

  // Validasi manual
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  next(); // Validasi berhasil, lanjutkan ke controller
}, bookController.createBook);

module.exports = router;
