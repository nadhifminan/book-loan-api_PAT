const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Pastikan authRoutes diimpor dengan benar
app.use('/api/books', bookRoutes);  // Pastikan bookRoutes diimpor dengan benar
app.use('/api/borrows', borrowRoutes); // Jika ada rute borrows

// Error handling (optional)
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = (req, res) => {
  app(req, res);
};