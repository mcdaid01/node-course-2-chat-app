const express = require("express");
const path = require("path"); // makes gets rid of ../ jumping up and down directories etc
const http = require("http");
const socketIO = require("socket.io");

const {generateMessage,generateLocationMessage} = require("./utils/message");

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

    socket.on("createMessage",(message,callback)=>{
        console.log("createMessage",message);
        console.log("server callback",typeof(callback));
    
        io.emit("newMessage",generateMessage(message.from,message.text));
        //callback("this is from the server");// sends back to front end for acknowledgement
        //socket.broadcast.emit("newMessage",generateMessage(message.from,message.text));

    });

    socket.on("createLocationMesssage",(coords)=>{
        console.log(coords);
        io.emit("newLocationMessage",generateLocationMessage("Admin",coords.latitude,coords.longitude));

    });
    
    socket.on("disconnect",()=>{
        console.log("user was disconnected");
    });
});


server.listen(port,()=>{
    console.log(`listening on ${port}`);    
});