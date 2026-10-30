# Freedive Malang — Starter Setup + Navbar

Starter Tahap C.1 untuk website statis Malang Freediving Community, berdasarkan desain homepage yang sudah disetujui.

## Prasyarat
- Node.js 22.12+ (disarankan 22 LTS atau terbaru yang stabil)
- npm

## Jalankan

```bash
npm install
npm run dev
```

Buka alamat localhost yang muncul di terminal (biasanya http://localhost:5173/).

## Build

```bash
npm run build
npm run preview
```

## File utama

- `index.html`: homepage (konten hero disiapkan pada tahap berikutnya)
- `src/js/main.js`: navbar shared + mobile menu + active link
- `src/styles/main.css`: Tailwind CSS v4, font, dan warna brand
- `public/images/fdm-logo.png`: logo resmi dari file yang diserahkan
- `vite.config.js`: lima HTML entry points
- `tentang/`, `kegiatan/`, `galeri/`, `kontak/`: placeholder halaman agar navbar tidak 404

## Catatan

- Fokus pekerjaan saat ini hanya setup dan navbar, belum membangun hero atau bagian homepage lain.
- Desain referensi bukan aset produksi; foto underwater resmi akan ditambahkan pada tahap berikutnya.
- Navbar desktop sengaja memiliki tinggi 76px dan posisi logo/menu/CTA tiga kolom sesuai mockup.
