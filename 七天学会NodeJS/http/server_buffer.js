var http = require('http');

http.createServer(function (request,respond) {

    var body = [];

    console.info(request.method);
    console.info(request.headers);
    
   /* 可以使用postman设置消息体参数模拟请求*/
    request.on('data',function(chunk){
        console.info("chunk:"+ chunk);
        body.push(chunk);
    });

    request.on('end',function(){
        body = Buffer.concat(body);
        console.info(body.toString());
    });
    respond.writeHead(200,{'Content-Type':'text-plain'});
    respond.end("request done!\n");
}).listen(80);
