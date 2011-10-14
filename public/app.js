var socket = io.connect(document.location.protocol+"//"+document.location.hostname);

var back=0;
var front=0;
var turn=0;
socket.on('message:new',function(data){
  console.log('got',data);
  $('#message-tmpl').tmpl(data).appendTo('#messages');
});



$(function(){
  $('#send').click(function(){
    data={
      from:$('#chat-name').val(),
      message:$('#new-message').val()
    };
    socket.emit("message:send",data);
    console.log('sent',data);
  });



});
