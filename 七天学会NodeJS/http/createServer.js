var http = require('http');

http.createServer(function (request,respond) {
    console.info(request.url);
    respond.writeHead(200,{'Content-Type':'text-plain'});
    respond.end("hello world!\n");
}).listen(4000);