var net = require('net');

var server = net.createServer(function (conn) {
  conn.end("hello,i'm server!");
  console.log('client connected');
  conn.on("data",function(data){
    console.log("recived from client:",data.toString());
  })
  conn.on('end', () => {
    console.log('client disconnected');
  });
});

server.listen(4000,'localhost',function () {
    var address=server.address();
    console.info(" opened server on address %j ",address);
});
