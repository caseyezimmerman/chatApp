// We need to bring in the express module so we can use the router, public folder, etc
//http is part of core. we need it to run create server
var http = require('http')
var express = require('express');
var socketio = require('socket.io');
var app = express();
app.use(express.static(__dirname + '/public'));

var users = [];


//run create server against http like always but hand it the app (express)
var server = http.createServer(app);
server.listen(8080);
//make a new var called io that is listening to the listener 
var io = socketio.listen(server);

//the way that socket io works...
// 1. .on to listen
// 2. .emit to send
io.sockets.on('connect', (socket)=>{    //listening if someone connected to one of our sockets
	console.log("someone connected via a socket..wahoo!!")
	///****ADD ALL EVENT LISTENERS
	socket.on('nameToServer', (data)=>{
		var clientInfo = {
			name: data,
			clientId: socket.id
		}
		users.push(clientInfo)
		console.log(data)
		//emit takes two args just like clent
		// 1. event(we make this up)
		// 2. data to send
		io.sockets.emit('newUser', users)
	});
	socket.on('messageToServer',(messageObject)=>{
		console.log(messageObject);
		io.sockets.emit('messageToClient',messageObject)
	});
}) 

console.log('the server is listening on port 8080')