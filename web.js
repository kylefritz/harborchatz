var express =  require('express');
var datetime =  require('datetime');
var _ = require('underscore');

var app = express.createServer();
app.configure(function(){
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});
var io = require('socket.io').listen(app)
commands=[];
respond=function(to,byDoing){
  commands.push([to,byDoing]);
}
publishMessage=function(data){
  _.each(commands,function(command){
    if(command[0].test(data.message)){
      command[1](data.message);
    }
  });
  io.sockets.emit('message:new',data);
}


//special responds commands
respond(/digital harbor/ig,function(data){
  console.log('sending jagger!');
  io.sockets.emit('message:jagger',data);
});

//routes
app.get('/',function(req,resp){
  resp.sendfile(__dirname + '/templates/app.html');
});

app.post('/message',function(req,resp){
  publishMessage({from:req.body.from,message:req.body.message});
  resp.send({status:"ok, i'll send it!"});
});


//sockets
io.sockets.on('connection', function (socket) {
  //socket.emit('message:new',{front:front, back:back, turn:turn});
  socket.on('message:send',function(data){
    console.log('received message from client',JSON.stringify(data));
    publishMessage(data);
  });
});

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("listening on "+port);
});
