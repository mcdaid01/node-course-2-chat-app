const express = require("express");
const path = require("path"); // makes gets rid of ../ jumping up and down directories etc
const http = require("http");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection",(socket)=>{
    console.log("new user connected");

    // joining chat room
    socket.emit("newMessage", generateMessage("admin","welcome to the chat app"));
    socket.broadcast.emit("newMessage", generateMessage("admin","a new user joined."));

    socket.on("disconnect",()=>{
        console.log("user was disconnected");
    });

    
    
    socket.on("createMessage",(message)=>{
        console.log("createMessage",message);
    
        socket.broadcast.emit("newMessage",generateMessage(message.from,message.text));

    });

    
});


server.listen(port,()=>{
    console.log(`listening on ${port}`);    
});