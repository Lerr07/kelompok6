# Praktikum Pertemuan 7 — Dashboard Penjadwalan Hemodialisis

Prototype ini digunakan sebagai **contoh praktikum** mata kuliah Transformasi Manajemen Informasi Kesehatan Ginjal.

## Tujuan

Mahasiswa mempraktikkan alur sederhana:

**Folder proyek → HTML → CSS → JavaScript → GitHub → Netlify**

Kasus yang digunakan adalah pengelolaan jadwal hemodialisis dengan **sesi pagi** dan **sesi siang**.

## Struktur File

```text
dashboard_hd_praktikum/
├── index.html
├── style.css
├── script.js
├── netlify.toml
└── README.md
```

## Cara Menjalankan di Laptop

1. Ekstrak ZIP.
2. Buka folder proyek.
3. Klik dua kali `index.html`.
4. Dashboard akan terbuka di browser.
5. Jika mengubah file, simpan lalu refresh browser.

## Fitur Contoh

- Ringkasan jumlah pasien.
- Sesi pagi dan sesi siang.
- Status pasien: terjadwal, menunggu, berlangsung, selesai, terlambat, batal.
- Status mesin HD.
- Filter sesi.
- Filter status.
- Filter mesin.
- Pencarian kode pasien.
- Peringatan mesin maintenance.
- Deteksi sederhana jadwal mesin bentrok.
- Peringatan kapasitas sesi.
- Indikator pemanfaatan sesi.

## Data

**WAJIB menggunakan data sintetis.**

Contoh kode:

- P001
- P002
- P003

Dilarang menggunakan:

- nama pasien nyata;
- NIK;
- nomor rekam medis asli;
- alamat;
- nomor telepon;
- data klinis identitas pasien nyata.

GitHub dan Netlify dapat diakses publik.

## Tugas Kelompok

Setiap kelompok terdiri dari **5 mahasiswa**.

Pembagian peran yang disarankan:

1. Ketua / analis kebutuhan.
2. Analis data MIK.
3. UI/UX.
4. Front-end.
5. Deployment / dokumentasi.

Kelompok harus mengembangkan contoh ini, bukan hanya mengganti judul.

Minimal:

- data sintetis 12–20 pasien;
- 4–8 mesin HD;
- sesi pagi dan siang;
- ringkasan;
- tabel jadwal;
- filter/status;
- minimal satu peringatan otomatis;
- desain kelompok sendiri;
- dapat dibuka melalui GitHub/Netlify.

## Upload ke GitHub

Cara termudah tanpa terminal:

1. Login GitHub.
2. Klik **New repository**.
3. Beri nama repository, misalnya `dashboard-hd-kelompok-01`.
4. Buat repository.
5. Pilih **Add file → Upload files**.
6. Upload `index.html`, `style.css`, `script.js`, `README.md`, dan `netlify.toml`.
7. Klik **Commit changes**.
8. Salin link repository.

## Deploy ke Netlify

1. Login Netlify.
2. Pilih **Add new project / Import an existing project**.
3. Hubungkan dengan GitHub.
4. Pilih repository dashboard kelompok.
5. Untuk proyek HTML statis ini, tidak diperlukan build command.
6. Publish directory: `.`
7. Deploy.
8. Buka link Netlify dari HP/browser lain untuk memastikan dapat diakses.

## Yang Dikumpulkan

- Link GitHub.
- Link Netlify.
- Screenshot dashboard.
- Nama anggota kelompok.
- Pembagian tugas.
- Analisis singkat manfaat dan risiko.

## Catatan

Prototype ini **bukan sistem pelayanan klinis** dan tidak menggunakan backend/database produksi.
