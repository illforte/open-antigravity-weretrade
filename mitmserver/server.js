const http = require('http');
const httpProxy = require('http-proxy');
const pino = require('pino');

const logger = pino();
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  logger.info({
    msg: 'Request received',
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  proxy.web(req, res, { target: 'http://localhost:3000' }, (e) => {
    logger.error({
      msg: 'Proxy error',
      error: e.message || String(e)
    });
    res.writeHead(502);
    res.end('There was an error proxying the request.');
  });
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  logger.info({
    msg: 'Response received',
    status: proxyRes.statusCode,
    headers: proxyRes.headers
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  logger.info({
    msg: `MITM Proxy server listening on port ${PORT}`
  });
});
