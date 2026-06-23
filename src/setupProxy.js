const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/chat',
    createProxyMiddleware({
      target: 'https://api.groq.com',
      changeOrigin: true,
      pathRewrite: { '^/api/chat': '/openai/v1/chat/completions' },
      on: {
        proxyReq: (proxyReq, req) => {
          // Re-build the body in Groq's OpenAI-compatible format
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const groqBody = JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                max_tokens: 1024,
                messages: [
                  { role: 'system', content: parsed.system },
                  ...parsed.messages,
                ],
              });
              proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`);
              proxyReq.setHeader('Content-Type', 'application/json');
              proxyReq.setHeader('Content-Length', Buffer.byteLength(groqBody));
              proxyReq.write(groqBody);
              proxyReq.end();
            } catch (e) {
              proxyReq.end();
            }
          });
        },
      },
    })
  );
};