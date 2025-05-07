
# 📚 Book Loan API – Sistem Peminjaman Buku Sederhana

Proyek ini adalah REST API sederhana menggunakan **Node.js**, **Express**, dan **MySQL** untuk mengelola data **Buku** dan **Peminjaman**, dilengkapi **fitur autentikasi JWT**, validasi, dan antarmuka pengguna berbasis HTML + JavaScript. Proyek ini memenuhi tugas mata kuliah pembuatan REST API dengan keamanan.

## 🛠 Teknologi yang Digunakan

| Komponen       | Deskripsi                              |
|----------------|------------------------------------------|
| **Backend**    | Node.js, Express, JWT, MySQL             |
| **Database**   | MySQL                                    |
| **Keamanan**   | JWT (JSON Web Token), CORS               |
| **Frontend**   | HTML, CSS, Vanilla JavaScript (fetch API)|
| **Deploy Lokal**| `localhost` di port `3000` & `5500`      |

## 📁 Struktur Direktori

```
project-folder/
│
├── config/
│   └── db.js              # Konfigurasi koneksi database MySQL
│
├── controllers/
│   ├── authController.js  # Login dan register user
│   ├── bookController.js  # CRUD buku
│   └── borrowController.js# CRUD peminjaman
│
├── middleware/
│   └── auth.js            # Middleware verifikasi JWT
│
├── models/
│   └── User.js            # (Opsional) Model user
│
├── routes/
│   ├── authRoutes.js      # Endpoint /api/auth
│   ├── bookRoutes.js      # Endpoint /api/books
│   └── borrowRoutes.js    # Endpoint /api/borrows
│
├── frontend/
│   ├── login.html         # Form login
│   ├── register.html      # Form registrasi
│   ├── dashboard.html     # Dashboard peminjaman
│   └── scripts/
│       └── api.js         # Script untuk fetch ke API
│
├── .env                   # Konfigurasi lingkungan (JWT_SECRET, DB, dll)
├── api.js                 # Entry point aplikasi Express
└── package.json           # Dependensi proyek
```

## ⚙️ Cara Menjalankan Proyek di Lokal

### 🔽 1. Clone Repository

```bash
git clone <url-project>
cd project-folder
```

### 📦 2. Install Dependency

```bash
npm install
```

### 🛠 3. Konfigurasi `.env`

Buat file `.env` di root folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=book_db
JWT_SECRET=rahasia123
```

### 🧰 4. Setup Database MySQL

Login ke MySQL dan jalankan SQL berikut:

```sql
CREATE DATABASE bookt09;

USE book_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  year INT
);

CREATE TABLE borrowings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  book_id INT,
  borrow_date DATE,
  return_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);
```

### ▶️ 5. Jalankan Server

```bash
node api.js
```
Atau jika menggunakan `nodemon`:

```bash
npx nodemon api.js
```

Server akan berjalan di `http://localhost:3000`

## 🌐 Menjalankan Antarmuka Frontend

1. Buka folder `frontend/`
2. Klik kanan pada `login.html` → **Open with Live Server**  
   atau akses langsung via `http://localhost:5500/frontend/login.html`

## 🔒 Fitur Keamanan

- 🔐 **JWT Authentication** – hanya user yang login bisa mengakses endpoint peminjaman
- 🌍 **CORS** – mengizinkan akses frontend dari port tertentu
- ✅ **Validasi Input** – memastikan data yang masuk sesuai format

## 🚀 Endpoint REST API

| Method | Endpoint                 | Keterangan             |
|--------|--------------------------|------------------------|
| POST   | `/api/auth/register`     | Registrasi pengguna    |
| POST   | `/api/auth/login`        | Login & dapatkan token |
| GET    | `/api/books`             | Ambil semua buku       |
| POST   | `/api/books`             | Tambah buku            |
| PUT    | `/api/books/:id`         | Edit buku              |
| DELETE | `/api/books/:id`         | Hapus buku             |
| GET    | `/api/borrows`           | Lihat peminjaman       |
| POST   | `/api/borrows`           | Tambah peminjaman      |
| PUT    | `/api/borrows/:id`       | Edit peminjaman        |
| DELETE | `/api/borrows/:id`       | Hapus peminjaman       |

> Semua endpoint peminjaman hanya dapat diakses oleh user yang sudah login (dengan token JWT di `Authorization: Bearer <token>`)

## 🧪 Testing API

Gunakan [Postman](https://www.postman.com/) atau [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) di VSCode untuk menguji endpoint.

## 🤝 Kontribusi

Proyek ini dikembangkan sebagai tugas mata kuliah oleh Nadhif Fajrul minan.  
Silakan fork & kembangkan sesuai kebutuhan.
