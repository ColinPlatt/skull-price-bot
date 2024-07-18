const http = require('http');
const skullBot = require('./netlify/functions/skullBot');

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const { method } = req;
  if (method === 'POST') {
    // Handle POST requests as before
    const body = [];
    req.on('data', data => body.push(data.toString()));
    req.on('end', async () => {
      const message = JSON.parse(body.join(''));
      try {
        const result = await skullBot(req, res); // Pass the request and response objects as arguments
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (method === 'GET') {
    try {
      const result = await skullBot(req, res); // Pass the request and response objects as arguments
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method Not Allowed\n');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});