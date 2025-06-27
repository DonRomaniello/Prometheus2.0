import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { qrcode } from 'vite-plugin-qrcode';
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    qrcode(),
    react({
    // Enable JSX in .js files
    include: "**/*.{jsx,js}",
  })],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ]
    }
  }
})
