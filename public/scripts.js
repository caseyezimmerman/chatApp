// console.log('sanity check');
$(document).ready(()=>{


	//set up the route
	var socketUrl = 'http://127.0.0.1:8080';
	// console.log(io);
	var socketio = io.connect(socketUrl);
	var name = prompt("what is your name?")
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var hour = today.getHours()
	var minute = today.getMinutes()
	var second = today.getSeconds()
	today = year + '/' + month + '/' + day + "  " + hour +':'+minute+':'+second;

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
		usersHTML = `<h4>Online Users</h4>`;
		users.map((user)=>{
			usersHTML+= `<div class="col-sm-12 bold">${user.name}</div>`;
			// usersHTML+=`<form id="logout">`
			usersHTML+=`<button type="submit" class="btn btn-muted">Logout</button>`
			// usersHTML+=`</form>`
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
		socketio.emit('messageToServer',{
			today: today,
			name: name,
			message: newMessage
		});
		$("#new-message").val("");
	});
	socketio.on('messageToClient',(messageObject)=>{
		$('#messages').prepend(`<span>${messageObject.today}:</span> <span class="fancy">${messageObject.name} </span> <span>${messageObject.message}</span><br/>`)
	})
	
});

// 	$('#logout').submit((event)=>{
// 		event.preventDefault();
// 		console.log('click')
// 		$('users').splice(user.name, 1);
// 	})
// });

