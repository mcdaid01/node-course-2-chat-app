const express = require("express");
const path = require("path"); // makes gets rid of ../ jumping up and down directories etc
const http = require("http");
const socketIO = require("socket.io");


const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("new user connected");

    socket.emit("newMessage",{ // to the new user
        from:"admin",
        text:"welcome to the chat app"
    });

    socket.broadcast.emit("newMessage",{ // broadcast.emit goes to everyone but the sender
        from:"admin",
        text:"a new user joined",
        createdAt:Date.now()
    });


    

    socket.on("disconnect",()=>{
        console.log("user was disconnected");
    });

    socket.emit("newMessage",{
        from:"John",
        text:"see you later",
        createdAt:Date.now()
    });
    
    
    socket.on("createMessage",(message)=>{
        console.log("createMessage",message);
    
        socket.broadcast.emit("newMessage",{ // broadcast.emit goes to everyone but the sender
            from:message.from,
            text:message.text,
            createdAt:Date.now()
        });

    });

    socket.on("newMessage",(data)=>{
        console.log(data);
        socket.emit("")
    });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`listening on ${port}`);    
});