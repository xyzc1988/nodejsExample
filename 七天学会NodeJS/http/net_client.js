var net = require('net');

var option = {
  port:4000
}

var client = net.connect(option,function () {
  console.log('connected to server!');
  client.write('world!\n');
  client.on('data', function (data) {
      console.log(data.toString());
  });
  client.on('end', function() {
      console.log('disconnected from server');
      client.destroy();
  });
});
