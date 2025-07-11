import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: "/Shepherds-Pie-client-nkzyay/",
    server: {
        open: true,
    },
    build: {
      outDir: 'dist',
    },
    plugins: [react()],
  };
});