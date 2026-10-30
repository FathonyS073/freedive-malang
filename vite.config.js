import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [tailwindcss()],
  input: {
    home: resolve(import.meta.dirname, 'index.html'),
    tentang: resolve(import.meta.dirname, 'tentang/index.html'),
    kegiatan: resolve(import.meta.dirname, 'kegiatan/index.html'),
    galeri: resolve(import.meta.dirname, 'galeri/index.html'),
    kontak: resolve(import.meta.dirname, 'kontak/index.html'),
  },
})
