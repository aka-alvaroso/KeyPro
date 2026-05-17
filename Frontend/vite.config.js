import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const trailingSlashRedirect = {
  name: 'trailing-slash-redirect',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/keypro') {
        res.writeHead(301, { Location: '/keypro/' });
        res.end();
        return;
      }
      next();
    });
  }
};

export default defineConfig({
  plugins: [react(), trailingSlashRedirect],
  base: '/keypro/',
  server: {
    port: 3000,
  },
  define: {
    'process.env.VITE_APP_VERSION': JSON.stringify(require('./package.json').version)
  }
})
