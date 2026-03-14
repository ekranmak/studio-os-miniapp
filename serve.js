const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'apps', 'api', 'public', 'index.html');
const HTML = fs.readFileSync(htmlPath, 'utf8');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(HTML);
}).listen(process.env.PORT || 3000, () => {
  console.log('Mini App UI: http://localhost:' + (process.env.PORT || 3000));
});
