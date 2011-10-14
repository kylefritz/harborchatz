var socket = io.connect(document.location.protocol+"//"+document.location.hostname);

socket.on('message:new',function(data){
  console.log('got',data);
  $('#message-tmpl').tmpl(data).appendTo('#messages');
});



$(function(){

  $('#chat-name').val("Some Dude "+parseInt(Math.random()*100)),

  $('#send-message').submit(function(e){
    data={
      from:$('#chat-name').val(),
      message:$('#new-message').val()
    };
    socket.emit("message:send",data);
    console.log('sent',data);
    $("#new-message").val('');

    e.preventDefault();
  });



});
