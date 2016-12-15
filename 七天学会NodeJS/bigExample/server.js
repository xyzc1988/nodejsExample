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
    combineFiles(urlInfo.pathnames,function(err,data){
      if (err) {
        response.writeHead(404);
        response.end(err.message);
      }else {
        response.writeHead(200,{
          'Content-Type' : urlInfo.mime
        })
        response.end(data);
      }
    });
  }).listen(port);
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
