var express =  require('express');
var datetime =  require('datetime');

var app = express.createServer();
app.configure(function(){
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});


//routes
app.get('/',function(req,resp){
  resp.sendfile(__dirname + 'templates/index.html');
});

//sockets
var io = require('socket.io').listen(app)
io.sockets.on('connection', function (socket) {
  //socket.emit('message:new',{front:front, back:back, turn:turn});
  socket.on('message:send',function(data){
    io.sockets.emit('message:new',data);
  });
});

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("listening on "+port);
});
