const bcrypt = require('bcryptjs'); // <-- ganti ini
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // tetap sama
    const userId = await userModel.createUser(username, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await userModel.findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // tetap sama
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
