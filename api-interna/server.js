const http = require('http');
const PORT = process.env.PORT || 4000;
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.url === '/status') {
    res.writeHead(200);
    res.end(JSON.stringify({
      servicio: 'api-interna',
      estado: 'ok',
      puerto: PORT
    }));
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'recurso no encontrado' }));
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`api-interna escuchando en ${PORT}`);
});
