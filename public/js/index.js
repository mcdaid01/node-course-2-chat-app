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
    const formattedTime = moment(message.createdAt).format("h:mm a");
    $("<li>").text(`${message.from} ${formattedTime} : ${message.text}`).appendTo("#messages");  
});

socket.on("newLocationMessage",(message)=>{
    console.log("newLocationMessage",message);

    const formattedTime = moment(message.createdAt).format("h:mm a");
   $("<li>").appendTo("#messages").append(
       $("<a>")
        .attr({
            "href":message.url,
            target:"blank"
        }).html( message.from+" "+formattedTime+" Current Location")
    );  
});


/*$("#message-form").on("submit",(evt)=>{
    evt.preventDefault();
    let $input=$("input[name='message']");

    socket.emit("createMessage",{
        from:"user",
        text: $input.val()
    },(evt)=>{
        console.log("callback",evt);
        $input.val("");
    });
});*/

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
  
    var messageTextbox = jQuery('[name=message]');
  
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
      messageTextbox.val('')
    });
  });


$("#send-location").on("click",function(){ // note use this
    console.log("clicked");
    if (!navigator.geolocation)
        return alert("geolocation not available");

    const $this=$(this);
    $this.attr("disabled","disabled").text("sending location");// stop spamming button loads
        
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log("position",position);
        socket.emit("createLocationMesssage",{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });

        $this.removeAttr("disabled").text("send location");
    },
    ()=>{
        // may need https
        alert("unable to fetch position");
        $this.removeAttr("disabled").text("send location");
    })
});