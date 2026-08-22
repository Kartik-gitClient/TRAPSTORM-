import http from 'node:http';
import nonExistent from 'non-existent-module-xyz'; 

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Essential for cloud deployment (Render, Railway, Fly.io, Docker, etc.)

// Helper: Common HTTP response
const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    });
    return res.end();
  }

  // 1. Health Check (Required for cloud platforms / load balancers)
  if (req.method === 'GET' && (pathname === '/' || pathname === '/health')) {
    return sendJson(res, 200, {
      status: 'healthy',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }

  // 2. Webhook Receiver Endpoint
  if (req.method === 'POST' && (pathname === '/webhook' || pathname === '/api/webhook')) {
    let rawBody = '';

    req.on('data', chunk => {
      rawBody += chunk;
      // Protection against oversized payloads (limit: 5MB)
      if (rawBody.length > 5 * 1024 * 1024) {
        req.destroy();
      }
    });

    req.on('end', () => {
      let parsedPayload = null;
      try {
        parsedPayload = JSON.parse(rawBody || '{}');
      } catch {
        parsedPayload = { raw: rawBody };
      }

      console.log(`[${new Date().toISOString()}] 🔔 Webhook Received:`);
      console.log(JSON.stringify(parsedPayload, null, 2));

      return sendJson(res, 200, {
        status: 'success',
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString()
      });
    });

    req.on('error', (err) => {
      console.error('Request stream error:', err);
      sendJson(res, 400, { error: 'Invalid payload stream' });
    });

    return;
  }

  // Fallback 404
  sendJson(res, 404, { error: 'Route not found' });
});

// Start listening
server.listen(PORT, HOST, () => {
  console.log(`🚀 Production-ready backend running on http://${HOST}:${PORT}`);
  console.log(`   - Health check: http://localhost:${PORT}/health`);
  console.log(`   - Webhook URL:  http://localhost:${PORT}/webhook`);
});

// Graceful shutdown handling for container/cloud platforms
const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
