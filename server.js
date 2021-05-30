const express = require('express')
const path = require('path')
const process = require('process')
const port = process.env.PORT || 3000
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }})


    // conversor: https://stackoverflow.com/questions/53247588/converting-a-string-into-binary-and-back
    function stringToBinary(input) {
        var characters = input.split('');
    
        return characters
            .map(function(char) {
                return char.charCodeAt(0).toString(2).padStart(8, 0)
            })
            .join(' ');
    }
    //

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{
    res.render('index')
})
app.get('*', (req,res)=>{
    res.sendFile(path.resolve('public/404.html'))
})



io.on('connection', socket => {
   let prev = [] 
    
  socket.on('message', function(data) {
    const obj = {
        id: socket.id,
       username: data.username,
       text: data.mensage,
       binary: stringToBinary(data.mensage),
    }
    prev.push(obj)

    console.log(prev)
    socket.broadcast.emit("previas", prev)
    socket.emit("previas", prev)

});


});


    


server.listen(port)