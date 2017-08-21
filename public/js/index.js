/* Re course avoids arrow functions on client */

const socket = io();
socket.on("connect",()=>{
    console.log("connected to server");
    
    socket.emit("createMessage",{
        text:"can we meet at six",
        from:"Mike"     
    })
});

socket.on("disconnect",()=>{
    console.log("disconnected from server");
});

socket.on("newMessage",(message)=>{
    console.log("newMessage",message);    
});