var fs = require('fs');
var path = require('path');

function travel(dir,callback) {
  fs.readdirSync(dir).forEach(function(file){
    var pathname = path.join(dir,file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname,callback);
    }else {
      callback(pathname);
    }
  })
}
console.info('传入的路径:' + 'D:\\nodejs\\七天学会NodeJS\\node-echo');
console.info('标准化传入的路径:' + path.normalize('D:\\nodejs\\七天学会NodeJS\\node-echo'));
travel('D:/nodejs/七天学会NodeJS/node-echo', function (pathname) {
    console.log(pathname);
});
