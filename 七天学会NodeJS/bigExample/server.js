var fs = require('fs');
var path = require('path');
var http = require('http');

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathnames,callback) {
  var output = [];

  (function next(i,len) {
    if (i < len) {
      fs.readFile(pathnames[i],function (err,data) {
        if (err) {
          callback(err);
        }else {
          output.push(data);
          next(i + 1,len);
        }
      })
    }else {
      callback(null,Buffer.concat(output));
    }
  })(0,pathnames.length);
}

function main(argv) {
  var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
  var root = config.root || '.';
  var port = config.port || 80;

  http.createServer(function (request,response) {
    console.log("connect coming...");
    var urlInfo = parseURL(root,request.url);

    validateFile(urlInfo.pathnames,function(err,pathnames){
      if(err){
        response.writeHead(404);
        response.end(err.message);
      }else{
        response.writeHead(200,{
          'Content-Type' : urlInfo.mime
        });

        outputFiles(pathnames,response);
      }
    })

  }).listen(port);
}

function outputFiles(pathnames,writer) {
  (function next(i,len) {
    if(i < len){
      var render = fs.createReadStream(pathnames[i]);

      render.pipe(writer,{end:false});
      render.on('end',function(){
        next(i + 1,len);
      });
    }else{
     writer.end();
    }
  })(0,pathnames.length);
}

function validateFile(pathnames,callback) {
  (function next(i,len) {
    if(i < len){
      fs.stat(pathnames[i],function (err,state) {
        if(err){
          callback(err);
        }else if(!state.isFile()){
          callback(new Error("target is not a file!!"));
        }else{
          next(i + 1,len);
        }
      });
    }else{
      callback(null,pathnames);
    }
  })(0,pathnames.length);
}

function parseURL(root,url){
  var base,pathnames,parts;

  if (url.indexOf('??') === -1) {
    url = url.replace('/','/??');
  }
  console.log(url);
  parts = url.split('??');
  base = parts[0];

  pathnames = parts[1].split(',').map(function (value) {
    return path.join(root,base,value);
  });
  console.log('解析URL组装pathnames : ' + pathnames);
  return {
    mime : MIME[path.extname(pathnames[0])] || 'text/plain',
    pathnames : pathnames
  }
}

main(process.argv.slice(2));
