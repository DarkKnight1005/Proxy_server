const fs = require('fs');
const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');
const HttpProxy = require('http-proxy');

//var proxy = new HttpProxy();
    
var KEY = '/etc/letsencrypt/live/hyandrdos.com/privkey.pem';
var CERT = '/etc/letsencrypt/live/hyandrdos.com/fullchain.pem';

var options = {
  https: {
    key: fs.readFileSync(KEY, 'utf8'),
    cert: fs.readFileSync(CERT, 'utf8')
  }
};

//
// Create a standalone HTTPS proxy server
//
httpProxy.createServer(8000, 'localhost', options).listen(8001);

//
// Create an instance of HttpProxy to use with another HTTPS server
//
var proxy = new HttpProxy({
  target: {
    host: 'localhost', 
    port: 8000
  }
});
https.createServer(options.https, function (req, res) {
  proxy.proxyRequest(req, res);
res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello https\n');
  res.end();
}).listen(8002);

//
// Create the target HTTPS server for both cases
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello https\n');
  res.end();
}).listen(8000);
