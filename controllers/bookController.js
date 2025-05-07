const db = require('../config/db');

exports.getAllBooks = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM books");
    res.status(200).json(results);
  } catch (err) {
    console.error("Get books error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    // Validasi manual sudah dilakukan di routes
    const [result] = await db.query(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [title, author]
    );

    res.status(201).json({
      message: "Book successfully added",
      bookId: result.insertId,
    });
  } catch (err) {
    console.error("Create book error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
