let gulp = require("gulp");
let browserify = require("browserify");
let source = require("vinyl-source-stream");
let tsify = require("tsify");
// let loadsh = require('loadsh');
// let watchify = require('watchify');
// let buffer = require('vinyl-buffer');
// let gutil = require('gulp-util');
var workSpaceDir = __dirname;
//copy bin文件到release文件夹
gulp.task("copyFile", function() {
    let baseCopyFilter = `${workSpaceDir}/laya/assets/**/*.*`;
    var stream = gulp.src([baseCopyFilter]);
    return stream.pipe(gulp.dest(`${workSpaceDir}/bin/`));
});


var browserifyOpts = {
    basedir: workSpaceDir,
    //是否开启调试，开启后会生成jsmap，方便调试ts源码，但会影响编译速度
    debug: true,
    entries: ['src/LayaAir3D.ts'],
    cache: {},
    packageCache: {}
}

var browserifyInst = browserify(browserifyOpts);

// var opts = loadsh.assign({},watchify.args,browserifyOpts);
// var b = watchify(browserify(opts));
// b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
// b.on('log', gutil.log); // 输出编译日志到终端
//使用browserify，转换ts到js，并输出到bin/js目录
gulp.task("default", gulp.series(["copyFile"], bundle));

function bundle() {
    // return b
    return browserifyInst
        //使用tsify插件编译ts
        .plugin(tsify)
        .bundle()
        // .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        //使用source把输出文件命名为bundle.js
        .pipe(source('bundle.js'))
        //缓存buff 加快编译速度
        // .pipe(buffer())
        //把bundle.js复制到bin/js目录
        .pipe(gulp.dest(workSpaceDir + "/bin/js"));
}