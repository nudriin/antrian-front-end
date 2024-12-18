# AntriHelu

AntriHelu adalah aplikasi frontend antrian berbasis **React** menggunakan **Vite** dan **TypeScript**. Aplikasi ini dilengkapi dengan fitur Socket.IO untuk komunikasi real-time, integrasi reCAPTCHA untuk keamanan, serta Progressive Web App (PWA).

## Fitur Utama

-   **React + Vite**: Build tool yang cepat dan modern.
-   **TypeScript**: Menyediakan type safety untuk pengembangan.
-   **Socket.IO**: Mendukung komunikasi real-time untuk fitur antrian.
-   **Google reCAPTCHA**: Menambahkan keamanan form input.
-   **PWA Support**: Aplikasi bisa diinstal dan berjalan secara offline.

## Instalasi

### Prasyarat

-   Node.js v18 atau lebih baru.
-   NPM atau Yarn.

### Langkah Instalasi

1. Clone repository ini:

    ```bash
    git clone https://github.com/nudriin/antrian-front-end.git
    cd sistem-antrian-disdik-frontend
    ```

2. Instal dependensi:

    ```bash
    npm install
    # atau
    yarn install
    ```

3. Konfigurasi file `.env`:
   Buat file `.env` di root project dan tambahkan konfigurasi berikut:

    ```env
    VITE_ENDPOINT_DEV=<url_backend>
    VITE_LOCAL_IP_DEV=<local_ip>
    VITE_APP_SITE_KEY=<reCAPTCHA_site_key>
    ```

4. Jalankan aplikasi:

    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:5173`.

## Script yang Tersedia

-   **`npm run dev`**: Menjalankan aplikasi dalam mode development.
-   **`npm run build`**: Build aplikasi untuk production.
-   **`npm run preview`**: Menjalankan preview build production.
-   **`npm run lint`**: Mengecek kode menggunakan ESLint.

## Teknologi yang Digunakan

| Teknologi        | Deskripsi                                   |
| ---------------- | ------------------------------------------- |
| React + Vite     | Framework dan bundler frontend modern.      |
| TypeScript       | Superset dari JavaScript untuk type safety. |
| Socket.IO        | Library untuk komunikasi real-time.         |
| TailwindCSS      | Utility-first CSS framework.                |
| Google reCAPTCHA | Layanan untuk validasi pengguna.            |
| Vite PWA Plugin  | Dukungan Progressive Web App (PWA).         |

## Konfigurasi Proxy

Server development menggunakan proxy untuk berkomunikasi dengan backend:

```javascript
server: {
    proxy: {
        "/api": {
            target: "http://localhost:5000",
            changeOrigin: true,
            secure: true,
            ws: true,
        },
    },
},
```

## PWA

Aplikasi ini mendukung PWA dengan konfigurasi berikut:

-   **Ikon**: Tersedia dalam berbagai ukuran.
-   **Auto Update**: PWA akan diperbarui otomatis saat ada perubahan.

## Struktur Direktori

```
public/
src/
|-- assets/          # Asset statis
|-- components/      # Component React
|-- constants/       # Data Constants
|-- helper/          # Helper functions
|-- hooks/           # Custom hooks
|-- lib/             # Utility
|-- pages/           # Halaman aplikasi
|-- types/           # DTO atau Response
|-- socket.ts        # Konfigurasi Socket.IO
|-- App.tsx          # Root component
|-- main.tsx         # Entry point
```
