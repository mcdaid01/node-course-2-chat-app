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

socket.on("newLocationMessage",(message)=>{
    console.log("newLocationMessage",message);
   $("<li>").appendTo("#messages").append(
       $("<a>")
        .attr({
            "href":message.url,
            target:"blank"
        }).html(message.from+":")
    );  
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


$("#send-location").on("click",()=>{
    console.log("clicked");
    if (!navigator.geolocation)
        return alert("geolocation not available");
        
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log("position",position);
        socket.emit("createLocationMesssage",{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },
    ()=>{
        alert("unable to fetch position");
    })
});