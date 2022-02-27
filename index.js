
const express=require('express');
const app=express();
const http=require('http').createServer(app);
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
http.listen(3000,()=>{
    console.log(`listen at http://localhost:3000`);
})
let users={};
const io=require('socket.io')(http);
io.on('connection',socket=>{
    console.log('connected...')
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',message)
   })
   socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id])
})
})
// let i=15;
// const users={};
// io.on('connection',socket=>{
    
//     socket.on('send',message=>{
//         socket.broadcast.emit('recieve',{message:message,username:users[socket.i]})
//     })
// 
