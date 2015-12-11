var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var History = require('./models/history');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/history', function( req, res ){
  var query = History.find({}).sort('-created_at').limit(10)
  query.exec(function(err, docs){
    res.json(docs.reverse());
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log(msg);
    entry = new History( msg );
    console.log( entry );
    entry.save( function(err){
      if(err)
        console.log(err);
      else
        console.log("Saved!")
    });

    io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
