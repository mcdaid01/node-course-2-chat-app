const express = require("express");
const path = require("path"); // makes gets rid of ../ jumping up and down directories etc
const http = require("http");
const socketIO = require("socket.io");

const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users =  new Users();

app.use(express.static(publicPath));


io.on("connection",(socket)=>{
    console.log("new user connected");

    
    socket.on("join",(params,callback)=>{

        console.log("join",params);

        if (!isRealString(params.name) || !isRealString(params.room)){
           return callback("name and room name are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id); // removes from previous room if necessary
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit("updateUserList",users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("admin","welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("admin",`${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(); // does not seem to work
      });

    socket.on("createLocationMesssage",(coords)=>{
        console.log(coords);
        io.emit("newLocationMessage",generateLocationMessage("Admin",coords.latitude,coords.longitude));

    });

    
    
    socket.on("disconnect",()=> {
        const user = users.removeUser(socket.id);
        if (user){
            io.to(user.room).emit("updateUserList",users.getUserList(user.room));
            io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} has left`));
        }
            
    });
});


server.listen(port,()=>{
    console.log(`listening on ${port}`);    
});