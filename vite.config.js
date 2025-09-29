import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import liveReload from 'vite-plugin-live-reload';
import { globSync } from 'glob';
import path from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import ejs from 'ejs';

// 疑似API用プラグイン
function ejsApiPlugin() {
  return {
    name: 'vite-ejs-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/') && req.url.match(/\.(json|xml)$/)) {
          const ext = req.url.endsWith('.json') ? 'json' : 'xml';
          const relativePath = req.url.replace(/^\/+/, '') + '.ejs';
          const filePath = path.resolve(__dirname, 'src', relativePath);

          if (fs.existsSync(filePath)) {
            const template = fs.readFileSync(filePath, 'utf-8');
            const data = {
              root: process.cwd(),
              now: new Date().getTime(),
              blogItems: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
              ],
              host: 'http://localhost:5173',
              siteName: 'mini.〈ミニドット〉',
            };
            const rendered = ejs.render(template, data);

            res.setHeader(
              'Content-Type',
              ext === 'json' ? 'application/json' : 'application/xml'
            );
            res.end(rendered);
            return;
          }
        }
        next();
      });
    },
  };
}

const jsFiles = Object.fromEntries(
  globSync('src/**/*.js', {
    ignore: ['node_modules/**', '**/modules/**', '**/dist/**'],
  }).map((file) => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
);

const scssFiles = Object.fromEntries(
  globSync('src/scss/**/*.scss', {
    ignore: ['src/scss/**/_*.scss'],
  }).map((file) => [
    path.relative(
      'src/scss',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
);

const inputObject = { ...scssFiles, ...jsFiles };

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      // 開発サーバーで擬似API
      ejsApiPlugin(),
      sassGlobImports(),
      ViteEjsPlugin((viteConfig) => {
        return {
          now: new Date().getTime(),
          root: viteConfig.root,
          host: 'http://localhost:5173',
          siteName: 'mini.〈ミニドット〉',
        };
      }),
      liveReload([__dirname + '/**/*.ejs', __dirname + '/api/**/*']),
    ],
    root: '.',
    base: './',
    server: {
      open: true,
      watch: {
        usePolling: true,
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: inputObject,
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names[0] || '';
            //画像
            if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(name)) {
              return 'assets/images/[name].[ext]';
            }

            // フォントファイル
            if (/\.(woff2|woff|ttf|eot)$/.test(name)) {
              return 'assets/fonts/[name].[ext]';
            }

            //css
            if (/\.css$/.test(name)) {
              return 'assets/css/[name].[ext]';
            }
            return 'assets/[name].[ext]';
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        global: path.resolve(__dirname, 'src/assets/scss/global/_index.scss'),
        '@_': path.resolve(__dirname, 'node_modules'),
      },
    },
  };
});
