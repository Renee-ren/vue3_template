import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { glob } from 'glob';
import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';

//多页面配置，自动匹配入口文件生成多页面
function dynamicPagesEntry() {
  const pages = {};
  glob.sync('./src/views/**/main.ts').forEach(path => {
    const pageName = path.split('./src/views/')[1].split('/main.ts').shift();
    pages[pageName] = resolve(__dirname, `src/views/${pageName}/index.html`);
  });
  console.log('pages:::', pages);
  return pages;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },

  base: './', //公共基础路径

  server: {
    port: 8080,
    open: true,
    proxy: {
      '/finchinaAPP': {
        target: 'http://10.15.97.30:8800/finchinaAPP',
        secure: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/finchinaAPP/, ''),
      },
    },
  },

  build: {
    terserOptions: {
      compress: {
        drop_console: false, //移除console
        drop_debugger: true, //移除debugger
      },
    },
    rollupOptions: {
      input: dynamicPagesEntry(), //打包文件入口
      //指定打包文件路径和名称
      output: {
        entryFileNames: 'static/js/[name]-[hash].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
      external: ['vue', 'vant'], //打包时排除的项（生产环境引用cdn）
      plugins: [
        commonjs(),
        externalGlobals({
          vue: 'Vue',
          vant: 'vant',
        }),
      ],
    },
  },
});
