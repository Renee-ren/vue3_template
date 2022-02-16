const fs = require('fs');

//获取dist/src下的所有目录
const dirNames = fs.readdirSync('./dist/src/views');

dirNames.forEach(dir => {
  //将dist/src下的所有html文件复制到dist目录下
  fs.copyFileSync(`./dist/src/views/${dir}/index.html`, `./dist/${dir}.html`);
});

//删除dist/src目录
fs.rmSync('./dist/src', { recursive: true });
