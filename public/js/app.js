let socket = io();

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on('newMessage', (message) => {
    console.log(message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});


$("#message-form").on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: "User",
        text: $("[name=message]").val()
    }, function(){
        $("[name=message]").val('');
    });
});

let locationButton = $('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
                    
            locationButton
              .removeAttr("disabled", "disabled")
              .text("Send location");
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });


    }, function(){
        locationButton
          .removeAttr("disabled", "disabled")
          .text("Send location");
        alert('Unable to fetch location.')
    });
});

socket.on('newLocationMessage',(message) => {
    let li = $('<li></li>');
    let a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});