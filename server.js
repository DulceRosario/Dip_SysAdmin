// server.js
const http = require('http');

const PORT = 3000;
const HOST = '127.0.0.1'; // Escucha solo localmente por seguridad

const server = http.createServer((req, res) => {
    // Agregamos algunas cabeceras para verificar que el proxy nos está enviando la IP real del cliente
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const forwardedHost = req.headers['x-forwarded-host'] || req.headers.host;

    console.log(`[${new Date().toISOString()}] Petición recibida para: ${req.url}`);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: "success",
        message: "¡Hola desde la aplicación Node.js detrás del proxy inverso!",
        timestamp: new Date(),
        debug: {
            url_solicitada: req.url,
            ip_cliente_detectada: clientIp,
            host_original: forwardedHost
        }
    }, null, 2));
});

server.listen(PORT, HOST, () => {
    console.log(`Aplicación Node.js corriendo internamente en http://${HOST}:${PORT}`);
});