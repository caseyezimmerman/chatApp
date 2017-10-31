// We need to bring in the express module so we can use the router, public folder, etc
//http is part of core. we need it to run create server
var http = require('http')
var express = require('express');
var app = express();

app.get('/', (req,res,next)=>{
	res.send('Hello, World');
})


//run create server against http like always but hand it the app (express)
var server = http.createServer(app);
server.listen(8080);
console.log('the server is listening on port 8080')