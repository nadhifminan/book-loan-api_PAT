// borrowController.js
const db = require('../config/db');

exports.createBorrow = async (req, res) => {
  try {
    const { book_id, borrow_date, return_date } = req.body;

    // Ambil user ID dari JWT yang didecode di middleware
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "User tidak terautentikasi" });
    }

    if (!book_id || !borrow_date || !return_date) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const borrowDate = new Date(borrow_date);
    const returnDate = new Date(return_date);

    if (returnDate <= borrowDate) {
      return res.status(400).json({ message: "Tanggal pengembalian harus lebih dari tanggal peminjaman" });
    }

    const [result] = await db.query(
      "INSERT INTO borrows (book_id, user_id, borrow_date, return_date) VALUES (?, ?, ?, ?)",
      [book_id, user_id, borrow_date, return_date]
    );

    res.status(201).json({
      message: "Peminjaman berhasil",
      borrowId: result.insertId,
    });
  } catch (err) {
    console.error("Error creating borrow record:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
