# Dokumentasi Penggunaan ChatGPT

# Tujuan Penggunaan ChatGPT

ChatGPT digunakan sebagai asisten teknis untuk membantu:

- Perencanaan arsitektur aplikasi React
- Klarifikasi kebutuhan soal
- Validasi logika JavaScript
- Review kesalahan sintaks dan best practice

# ChatGPT digunakan pada hal-hal berikut ini:

1. perencanaan awal
    - Menentukan struktur folder React
    - Menentukan pendekatan state management
    - Memetakan soal ke implementasi frontend
2. Validasi Logika JavaScript
    - Manipulasi array (map, filter, reduce)
    - Sorting data ascending & descending
    - Pengecekan palindrome
    - Pengecekan anagram
    - Transformasi JSON bertingkat (nested aggregation)
3. Debugging
    - Membantu mengidentifikasi error React rendering
    - Validasi penggunaan export/import ES Modules
    - Penjelasan error console
4. Best Practice
    - Immutable state update
    - Pemisahan logic ke folder utils
    - Penulisan fungsi reusable dan clean

# Berikut prompt yang digunakan selama pengerjaan
1. Tolong bantu saya merencanakan pengerjaan case Front End Developer menggunakan React.js

2. Apakah pendekatan state dan struktur data ini sudah sesuai best practice React?

3. Kenapa filter data React saya tidak tampil di UI, apakah ada kesalahan di map()?

4. Bagaimana cara mentransformasi JSON bertingkat menggunakan reduce agar sesuai expectation?

5. Apa penyebab error export/import ES Module di React Vite?

6. Saran styling memakai CSS tidak dengan library CSS 



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
