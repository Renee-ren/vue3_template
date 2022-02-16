const gulp = require('gulp'),
  minimist = require('minimist'),
  gulpSSH = require('gulp-ssh'),
  shell = require('shelljs');

// SVN项目目录
const projectSVN = 'https://192.168.100.188/svn/FC_APP/HTML/trunk/hf/metaData',
  // 内网服务器目录
  serverPath = '/home/html/hf/metaData',
  serverPath2 = '/app/OpenResty/nginx/html/appdev_html/hf/metaData',
  // metaData
  bundlePath = './dist',
  // 提交日志
  commitMsg = `【story#2451】第一次提交 - 时间戳${Date.now()}`;

gulp.task('build', cb => {
  shell.exec('yarn build');
  cb();
});

gulp.task('checkout', cb => {
  shell.exec(`svn checkout ${projectSVN}`);
  cb();
});

gulp.task('checkIn', cb => {
  const msgOptions = {
    string: 'm',
    default: {
      m: commitMsg,
    },
  };
  const options = minimist(process.argv.slice(2), msgOptions);
  const svnProjectPath = projectSVN.split('/').pop();

  shell.cd(svnProjectPath);
  shell.rm('-r', '*');
  shell.cd('..');
  shell.cp('-R', bundlePath + '/*', svnProjectPath);
  shell.cp('-R', './*.png', svnProjectPath);
  shell.cp('-R', './*.png', bundlePath);
  shell.cp('-R', './*.svg', svnProjectPath);
  shell.cp('-R', './*.svg', bundlePath);
  shell.cd(svnProjectPath);
  shell.exec('svn add * --force');
  shell.exec(`svn commit -m "${options.m}"`);
  shell.cd('..');
  cb();
});

gulp.task('removeMap', cb => {
  shell.rm(`${bundlePath}/**/assets/**/*.map`);
  cb();
});

//devwifi
gulp.task('upload', cb => {
  const ssh = new gulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: '10.15.97.42',
      username: 'root',
      password: 'jsoproject',
    },
  });
  setTimeout(() => {
    gulp.src(`${bundlePath}/**`).pipe(ssh.dest(serverPath));
    cb();
  }, 1000);
});

//dev
gulp.task('upload2', cb => {
  const ssh = new gulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: '10.10.17.119',
      username: 'reader',
      password: 'tcdept@428#',
    },
  });
  setTimeout(() => {
    gulp.src(`${bundlePath}/**`).pipe(ssh.dest(serverPath2));
    cb();
  }, 1000);
});

gulp.task('trunk', gulp.series('build', 'removeMap', 'checkout', 'checkIn', 'upload', 'upload2'));
gulp.task('default', gulp.series('trunk'));

gulp.task('checkInUpload', gulp.series('build', 'checkout', 'checkIn', 'upload', 'upload2'));
