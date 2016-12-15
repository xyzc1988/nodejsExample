var http = require('http');
var zlib = require('zlib');

http.createServer(function (request,response) {
  console.info("接收到请求!")
  var i = 1024,data = '';
  while (i--) {
    data += '.';
  }
  console.info(request.headers);
  if ((request.headers['accept-encoding'] || '').indexOf('gzip') != -1) {
    console.info("请求编码方式为Gzip")
    zlib.gzip(data,function (err,data) {
      response.writeHead(200,{
        'Content-Type' : 'text/plain',
        'Content-Encoding' : 'gzip'
      });
      response.end(data);
    });
  }else {
    response.writeHead(200,{
      "Content-Type":'text/plain'
    });
    response.end(data);
  }
}).listen(4000,'127.0.0.1',() =>{
  console.info("server running at localhost:4000")
});
