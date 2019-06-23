const express = require('express');
const app = express();

//set the template engine
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req,res) =>{
    // res.send('Hello World')
    res.render('index')
})


//listen on port 3003
server = app.listen(3003)


//set socket.io instance
const io = require('socket.io')(server);


//listen to every connection
io.on('connection', (socket) => {
  console.log('New User Connected');

  //default username
  console.log(io.username);
  socket.username = 'Anonymous';
  console.log(io.username);
  //change username if user calls the change_username
  socket.on('change_username', (data) => {
    socket.username = data.username
    console.log(socket.username)
  })

  //listen to message
  socket.on('new_message',(data) =>{
    //boardcast the new new_message
    io.sockets.emit('new_message',{message : data.message, username : socket.username});
  })

})
