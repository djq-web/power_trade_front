import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  // plugins: [vue(), vueDevTools()],
  plugins: [vue()],
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
    host: true, // host: "0.0.0.0"
    /** 端口号 */
    port: 3333,
    /** 是否自动打开浏览器 */
    open: false,
    /** 跨域设置允许 */
    cors: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    /** 接口代理 */
    proxy: {
      '/api/v1': {
        target: 'https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212',
        ws: true,
        /** 是否允许跨域 */
        changeOrigin: true,
      },
    },
    /** 预热常用文件，提高初始页面加载速度 */
    warmup: {
      clientFiles: ['./src/layouts/**/*.vue'],
    },
  },
  /** 混淆器 */
  esbuild:
    process.env.NODE_ENV == 'development'
      ? undefined
      : {
          /** 打包时移除 console.log */
          pure: ['console.log'],
          /** 打包时移除 debugger */
          drop: ['debugger'],
          /** 打包时移除所有注释 */
          legalComments: 'none',
        },
});
