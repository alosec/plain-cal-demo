import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@plain-calendar/core': path.resolve(__dirname, '../plain-calendar/packages/core/src'),
      '@plain-calendar/react': path.resolve(__dirname, '../plain-calendar/packages/react/src'),
    }
  }
})
