# 🍱 RasaBorneo - Platform Pemesanan Makanan Multi-Merchant

![Status](https://img.shields.io/badge/Status-Completed-success) ![Type](https://img.shields.io/badge/Type-Final%20Year%20Project-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)
![Tech](https://img.shields.io/badge/Stack-PHP%20%7C%20Laravel%20%7C%20MySQL-red) 

> **Platform web yang menghubungkan berbagai merchant kuliner lokal dengan pelanggan melalui sistem pemesanan terpusat, fitur kasir, dan integrasi QR Code.**

[**🌐 Live Demo**](https://rasaborneo.com) | [**📄 Baca Laporan TA**](https://repository.bsi.ac.id/repo/files/458671/download/Laporan-Tugas-Akhir-RANCANG-BANGUN-PLATFORM-PEMESANAN-MAKANAN-MULTI-MERCHANT-(RasaBorneo)-BERBASIS-WEB-(REVISI).pdf) | [**💼 LinkedIn Saya**](www.linkedin.com/thomasalberto)

---

## 📖 Latar Belakang (Overview)
**RasaBorneo** dikembangkan untuk menyelesaikan masalah fragmentasi dalam pemesanan makanan lokal di Pontianak. Platform ini memungkinkan UMKM (Merchant) untuk mengelola menu dan pesanan secara digital, sekaligus memudahkan pelanggan memesan dari berbagai merchant dalam satu platform web.

Project ini merupakan **Tugas Akhir** untuk Universitas Bina Sarana Informatika (UBSI) Pontianak, dirancang dengan fokus pada skalabilitas *Multi-Merchant* dan kemudahan transaksi menggunakan QR Code.

### Masalah yang Diselesaikan:
* ❌ Kesulitan UMKM lokal dalam menjangkau pasar digital.
* ❌ Pencatatan transaksi manual yang rawan kesalahan.
* ❌ Antrian fisik yang panjang saat pemesanan di tempat.

### Solusi:
* ✅ **Multi-Merchant Architecture:** Satu admin panel untuk banyak toko.
* ✅ **QR Code Ordering:** Pelanggan bisa scan untuk melihat menu dan memesan (Table Management).
* ✅ **Digital Cashier:** Dashboard khusus kasir untuk memproses pesanan masuk.

---

## 📸 Fitur Unggulan & Screenshot

### 1. User/Customer Interface
Tampilan beranda yang *user-friendly* mirip aplikasi food delivery modern, memudahkan pencarian menu dan merchant.
* ![Halaman Beranda](https://raw.githubusercontent.com/xRiot45/rasa-borneo/refs/heads/master/Beranda.png)

### 2. Dashboard Kasir & Scan QR
Memungkinkan kasir memvalidasi pesanan yang masuk baik dari web maupun scan QR di meja.
* ![Dashboard Kasir](https://github.com/xRiot45/rasa-borneo/blob/master/Dashboard%20Merchant.png?raw=true)

### 3. Manajemen Menu (Merchant)
Merchant dapat mengatur ketersediaan menu, harga, dan foto produk secara mandiri.
* ![Halaman Menu](https://github.com/xRiot45/rasa-borneo/blob/master/Daftar%20Menu.png?raw=true)

### 4. Admin Utama (Super Admin)
Pusat kontrol untuk memantau seluruh merchant, user, dan transaksi yang berjalan di platform RasaBorneo.
* ![Admin Dashboard](https://github.com/xRiot45/rasa-borneo/blob/master/Dashboard%20admin.png?raw=true)

---

## 🛠️ Tech Stack
Aplikasi ini dibangun menggunakan teknologi web modern untuk memastikan performa yang cepat dan responsif.

| Kategori | Teknologi |
| :--- | :--- |
| **Frontend** | TypeScript, Tailwind CSS, React JS |
| **Backend** | Laravel 12, Inertia JS |
| **Database** | MySQL |
| **Tools** | Visual Studio Code, Git |
| **Integrasi** | QR Code Generator Library, Midtrans |

---

## 🧩 Arsitektur Sistem & Database
Untuk memastikan integritas data antar merchant, sistem ini menggunakan relasi database yang ternormalisasi.

<details>
<summary><b>Klik untuk melihat Struktur Database (ERD)</b></summary>

![Entity Relationship Diagram](link-gambar-erd-anda.png)

</details>

---

## 🚀 Cara Menjalankan (Local Installation)
Ikuti langkah ini untuk menjalankan RasaBorneo di komputer lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/xRiot45/rasa-borneo.git](https://github.com/xRiot45/rasa-borneo.git)
    cd rasaborneo
    ```

2.  **Setup Database**
    * Buat database baru bernama `rasa_borneo`.
    * Import file `database.sql` yang ada di folder `/database`.

3.  **Konfigurasi Environment**
    * Sesuaikan koneksi database di file konfigurasi (misal `.env` atau `koneksi.php`).

4.  **Jalankan Project**
    * Jika menggunakan PHP Native/CI: Pindahkan folder ke `htdocs` dan buka `localhost/rasaborneo`.
    * Jika menggunakan Laravel:
        ```bash
        composer install
        php artisan key:generate
        php artisan serve
        ```

---

## 💡 Tantangan & Pembelajaran (Lessons Learned)
Selama pengembangan RasaBorneo, terdapat beberapa tantangan teknis yang berhasil diselesaikan:

* **Logic Multi-Merchant:** Mengatur agar data pesanan Merchant A tidak terlihat oleh Merchant B. *Solusi: Implementasi foreign key yang ketat pada setiap query transaksi.*
* **Integrasi QR Code:** Menghasilkan QR Code unik untuk setiap meja/transaksi. *Solusi: Menggunakan library [Nama Library] untuk generate string unik.*
* **Manajemen Session:** Menangani session untuk 3 role berbeda (Admin, Merchant, User) dalam satu browser.

---

## 👤 Author
**Thomas Alberto**
* 🎓 Sistem Informasi - Universitas Bina Sarana Informatika (UBSI) Pontianak
* 📧 thomasalberto456@gmail.com
* 🔗 [LinkedIn](www.linkedin.com/in/thomasalberto) | [GitHub](https://github.com/xRiot45/)

---
*Project ini didedikasikan sebagai syarat kelulusan Diploma Tiga (D3) tahun 2025.*
