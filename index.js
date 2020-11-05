const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const http = require('http');
const fs = require('fs');
const https = require('https');


var KEY = '/etc/letsencrypt/live/hyandrdos.com/privkey.pem';
var CERT = '/etc/letsencrypt/live/hyandrdos.com/fullchain.pem';

var proxy = httpProxy.createProxyServer({
 // ssl: {
   // key: fs.readFileSync('/etc/letsencrypt/live/hyandrdos.com/privkey.pem', 'utf8'),
   // cert: fs.readFileSync('/etc/letsencrypt/live/hyandrdos.com/fullchain.pem', 'utf8')
 // },
//  changeOrigin: true,
  agent: https.globalAgent,
  target: {
	https: true,
	host: 'hyandrdos.com',
	port: 8081
  },
  secure: true // Depends on your needs, could be false.
}).listen(8000);

proxy.on('error', function(e) {
  console.log(e);
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});
 
//
// Listen for the `open` event on `proxy`.
//
proxy.on('open', function (proxySocket) {
console.log('Hello'); 
 // listen for messages coming FROM the target here
  proxySocket.on('data', hybiParseAndLogMessage);
});
 
//
// Listen for the `close` event on `proxy`.
//
proxy.on('close', function (res, socket, head) {
console.log('Closed');
  // view disconnected websocket connections
  console.log('Client disconnected');
});

app.listen(8081);
////
//http.globalAgent.keepAlive = true;
app.get('/*', function(req, res){

proxy.on('error', function(e) {
  console.log(e);
});
	console.log('Hello');
	console.log(req.headers.host.toString());
//	res.redirect('http://' + req.headers.host.toString() + '/');
//	res.send(req.headers.host.toString());
res.send('Successss!!!');
//	proxy.web(req, res, { target: 'https://' + req.headers.host.toString() + '/' }, function(e){
//		console.log(req.headers);
//});
});
