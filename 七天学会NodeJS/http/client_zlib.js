var http = require('http');
var zlib = require('zlib');

var options = {
  hostname : '127.0.0.1',
  port : 4000,
  path : '/',
  method : 'GET',
  headers : {
    'Accept-Encoding': 'gzip, deflate'
  }
}

http.get(options,function (response) {
  var body = [];
  response.on('data',function (chunk) {
    body.push(chunk);
  });
  response.on('end',function (){
    body = Buffer.concat(body);
    if (response.headers['content-encoding'] === 'gzip') {
      console.info("响应编码方式为gzip")
      zlib.gunzip(body,function(err,data){
        console.info(data.toString());
      })
    }else {
      console.info("响应编码方式为普通")
      console.info(body.toString());
    }
  })

})
