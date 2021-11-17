import { defineConfig } from 'vite'
import resolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: 'src/github-user.ts',
      name: 'githubuser',
      formats: ['es']
    },
    rollupOptions: {
      external: mode === "production" ? "" : /^lit-element/,
    },
  },
  plugins: [
    // Resolve bare module specifiers to relative paths
    resolve(),
  ],
}))
