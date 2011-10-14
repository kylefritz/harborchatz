var express =  require('express');
var datetime =  require('datetime');

var app = express.createServer();
app.configure(function(){
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});
var io = require('socket.io').listen(app)
publishMessage=function(data){
    io.sockets.emit('message:new',data);
};

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
