var http = require('http');
var options = {
    hostname : 'localhost',
    port:80,
    path:'/upload',
    method:'POST',
    headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
}

var request = http.request(options,function(response){});

request.write('Hello World!');
request.end();