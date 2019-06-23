$(function(){
  //make connection with socket
  var socket = io.connect('http://localhost:3003/')

  //assign values to variables
  var message = $("#message");
  var username = $("#username");
  var send_message = $("#send_message");
  var send_username = $("#send_username");
  console.log(send_username);
  var chatroom = $("#chatroom");

  //sending username
  send_username.click(function(){
    socket.emit('change_username',{username: username.val()});
    console.log(username.val());
  })

  //enterbutton press triggering
  $('#message').keydown(function(event){
    if (event.keyCode === 13){
      $('#send_message').click();
    }
  });

  //sending message
  send_message.click(function(){
    socket.emit('new_message', {message:message.val()})
  })

  //listen on new message
  socket.on('new_message',(data) =>{
    console.log(data);
    chatroom.append("<p class='message'>" + data.username + ":" + data.message + "<p>")
  })
});
