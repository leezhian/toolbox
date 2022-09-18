import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      name: 't',
      fileName: 'toolbox'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.ts', '.js'],
  }
})
