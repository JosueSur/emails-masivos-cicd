const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
      secure: false,
      ws: true,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Origin', 'http://localhost:8001');
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      }
    })
  );
};
