const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../routes/authRoutes');
const bookRoutes = require('../routes/bookRoutes');
const borrowRoutes = require('../routes/borrowRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;
