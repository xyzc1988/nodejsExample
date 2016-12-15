var fs = require('fs');
var path = require('path');

function travel(dir,callback,finish) {
  fs.readdir(dir,function (err,files) {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir,files[i]);
        fs.stat(pathname,function (err,stats) {
          if (stats.isDirectory()) {
            travel(pathname,callback,function () {
              next(i + 1);
            });
          }else {
            callback(pathname,function(){
              next(i + 1);
            });
          }
        });
      }else {
        finish && finish();
      }
    }(0));
  })
}

travel("D:/nodejs/七天学会NodeJS/node-echo", function (pathname,fn) {
    console.log(pathname);
    fn();
},function(){
  console.log("遍历结束!!!");
});
