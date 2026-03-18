const http = require('http');
const httpProxy = require('http-proxy');
const pino = require('pino');
const crypto = require('crypto');

const logger = pino();
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const reqId = crypto.randomUUID();
  req.reqId = reqId; // Attach to request object for use in proxyRes

  logger.info({
    msg: 'Request received',
    reqId,
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  proxy.web(req, res, { target: 'http://localhost:3000' }, (e) => {
    logger.error({
      msg: 'Proxy error',
      reqId,
      error: e.message || String(e)
    });
    res.writeHead(502);
    res.end('There was an error proxying the request.');
  });
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  logger.info({
    msg: 'Response received',
    reqId: req.reqId,
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
