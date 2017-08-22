/* Re course avoids arrow functions on client */

const socket = io();
socket.on("connect",()=>{
    console.log("connected to server");
});

socket.on("disconnect",()=>{
    console.log("disconnected from server");
});

socket.on("newMessage",(message)=>{
    const formattedTime = moment(message.createdAt).format("h:mm a");
    const template = $("#message-template").html();
    const html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });

    $("#messages").append(html);  
});

socket.on("newLocationMessage",(message)=>{
    
    const formattedTime = moment(message.createdAt).format("h:mm a");
    const template = $("#location-message-template").html();
    const html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt:formattedTime
    });
    $("#messages").append(html);
});

$('#message-form').on('submit', function (e) {
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