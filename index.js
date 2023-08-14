// Memanggil modul express dan inisialisasi aplikasi
const express = require("express"); // Mengimpor modul 'express'
const app = express(); // Menginisialisasi aplikasi Express

// Memanggil modul path untuk manipulasi path direktori
const path = require('path'); // Mengimpor modul 'path'

// Konfigurasi alamat dan port server menggunakan konstanta
const url = '127.0.0.1'; // Alamat URL server
const port = '1026'; // Nomor port server
const http = `http://${url}:${port}`; // URL lengkap dengan alamat dan port

// Menggunakan middleware express.json() untuk meng-handle request dengan tipe JSON
app.use(express.json());

// Menggunakan middleware express.urlencoded() untuk meng-handle request dari form
app.use(express.urlencoded({ extended: true }));

// Mengatur view engine menggunakan EJS
app.set('view engine', 'ejs');

// Menentukan direktori views menggunakan modul path
app.set('views', path.join(__dirname, '/views')); // Menyusun path direktori views

// Data komentar awal dalam bentuk array objek
const comments = [
    {
        id: 1,
        username: "Juwet",
        text: "good product"
    },
    {
        id: 2,
        username: "Uhan",
        text: "normal product"
    },
    {
        id: 4,
        username:  "Aleo Shi ba",
        text: "bad product"
    },
];

// Menghandle route untuk halaman utama
app.get('/', (req, res) => {
    res.render('home'); // Menampilkan halaman 'home' menggunakan view engine EJS
});

// Menghandle route untuk halaman daftar komentar
app.get('/comment', (req, res) => {
    res.render('comment/IndexComment', { comments }); // Menampilkan halaman 'IndexComment' dengan data komentar
});

// Menghandle route untuk halaman pembuatan komentar baru
app.get('/comment/create', (req, res) => {
    res.render('comment/storeComment'); // Menampilkan halaman 'storeComment'
});

// Menghandle request POST untuk menyimpan komentar baru
app.post('/comment', (req, res) => {
    const { username, text } = req.body; // Mendapatkan data username dan text dari body request
    comments.push({ username, text }); // Menambahkan komentar baru ke array comments
    console.log(comments); // Menampilkan array comments di konsol
    res.redirect('/comment'); // Redirect ke halaman daftar komentar
});

// Menghandle route untuk halaman detail komentar
app.get('/comment/:id', (req, res) => {
    let { id } = req.params; // Mendapatkan id komentar dari parameter URL
    const comment = comments.find(c => c.id == parseInt(id)); // Mencari komentar berdasarkan id
    res.render('comment/showComment', { comment }); // Menampilkan halaman 'showComment' dengan data komentar
});

// Mengaktifkan server untuk mendengarkan koneksi pada alamat dan port yang sudah diatur
app.listen(port, url, () => {
    console.log(`Server running on ${http}`); // Menampilkan pesan saat server berjalan
});
