const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  console.log(JSON.stringify({
    level: 'info',
    msg: 'Request received',
    method: req.method,
    url: req.url,
    headers: req.headers
  }));

  proxy.web(req, res, { target: 'http://localhost:3000' }, (e) => {
    console.error(JSON.stringify({
      level: 'error',
      msg: 'Proxy error',
      error: e.message || String(e)
    }));
    res.writeHead(502);
    res.end('There was an error proxying the request.');
  });
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  console.log(JSON.stringify({
    level: 'info',
    msg: 'Response received',
    status: proxyRes.statusCode,
    headers: proxyRes.headers
  }));
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(JSON.stringify({
    level: 'info',
    msg: `MITM Proxy server listening on port ${PORT}`
  }));
});
