var http = require('http');

http.get('http://localhost:80',function (response) {
    var body = [];

    console.info(response.statusCode);
    console.info(response.headers);

    response.on('data',function(chunk){
        body.push(chunk);
    });

    response.on('end',function(){
        body = Buffer.concat(body);
        console.info(body.toString());
    })


})