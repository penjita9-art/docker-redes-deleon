const http = require('http');

// Configuración mediante variables de entorno
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;
const VERSION = process.env.APP_VERSION || '1.0';

const server = http.createServer(async (req, res) => {
  // Logger básico de peticiones
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  // Ruta de Healthcheck
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ estado: 'ok', version: VERSION, puerto: PORT }));
    return;
  }

  // Ruta que actúa como Proxy / Cliente de la API interna
  if (req.url === '/api') {
    // Validación crítica: Evita que fetch() falle por una URL inválida o indefinida
    if (!API_URL) {
      console.error('Error: La variable de entorno API_URL no está configurada.');
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Falta la configuración de API_URL en el servidor' }));
      return;
    }

    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.text();
      
      // Mantenemos el código de estado que devuelva la API interna (ej. 200, 404, etc.)
      res.writeHead(respuesta.status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(datos);
    } catch (error) {
      console.error('Error al conectar con la API:', error.message);
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'no se pudo conectar con api-interna' }));
    }
    return;
  }

  // Ruta principal (Interfaz HTML)
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>Redes con Docker</h1>
    <p>Sistemas Operativos - 4.º año</p>
    <p>Servicio público funcionando</p>
    <p>Versión: <strong>${VERSION}</strong></p>
    <ul>
      <li><a href="/health">Comprobar /health</a></li>
      <li><a href="/api">Consultar /api</a></li>
    </ul>
  `);
});

// Escuchar en el puerto configurado e interfaz correcta para Docker (0.0.0.0)
server.listen(PORT, '0.0.0.0', () => {
  console.log(`web-publica escuchando en el puerto ${PORT}`);
});
