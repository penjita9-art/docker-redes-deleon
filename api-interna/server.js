const http = require('http');
const PORT = process.env.PORT || 4000;
const server = http.createServer((req, res) => {
console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
res.setHeader('Content-Type', 'application/json; charset=utf-8');
if (req.url === '/status') {
res.writeHead(200);
res.end(JSON.stringify({

Sistemas Operativos - 4.º año

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
Crear api-interna/Dockerfile:
FROM node:22-alpine
WORKDIR /app
COPY server.js .
EXPOSE 4000
CMD [&quot;node&quot;, &quot;server.js&quot;]
