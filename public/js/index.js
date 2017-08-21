/* Re course avoids arrow functions on client */

const socket = io();
socket.on("connect",()=>{
    console.log("connected to server");
});

socket.on("disconnect",()=>{
    console.log("disconnected from server");
});

socket.on("newMessage",(message)=>{
    console.log("newMessage",message);
    $("<li>").text(`${message.from} : ${message.text}`).appendTo("#messages");  
});



$("#message-form").on("submit",(evt)=>{
    evt.preventDefault();

    socket.emit("createMessage",{
        from:"user",
        text: $("input[name='message']").val()
    },(evt)=>{
        console.log("callback",evt);
    });
});