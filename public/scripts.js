// console.log('sanity check');
$(document).ready(()=>{


	//set up the route
	var socketUrl = 'http://127.0.0.1:8080';
	// console.log(io);
	var socketio = io.connect(socketUrl);
	var name = prompt("what is your name?")
	//take the users name and send it to the server
	//emit takes 2 args
	// 1. event (we make this up)
	// 2. data to send via web socket
	///every time someone new connect all of this runs
	socketio.emit('nameToServer', name)
	socketio.on('newUser', (users)=>{
		// console.log(`${userName} just joined`)
		// $('#users').append(`<div class="col-sm-12">${userName}</div>`)
		var usersHTML = ""
		users.map((user)=>{
			usersHTML+= `<div class="col-sm-12">${user.name}</div>`
		});
		$('#users').html(usersHTML) //overwiting this div with the string above
	});

	///**User jquery to listen to form submit
	$('#submit-message').submit((event)=>{
		////stop the page from submitting
		event.preventDefault();
		//get value from input box
		var newMessage = $('#new-message').val();
		///user socketio, to send data to the server
		socketio.emit('MessageToServer',{
			name: name,
			message: newMessage
		});
	});
	socketio.on('messageToClient',(messageObject)=>{
		$('#messages').prepend(`<p>${messageObject.message}--${messageObject.name}</p>`)
	})
});