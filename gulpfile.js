// 引入gulp模块（本地安装的gulp），这个模块的代码就在 node_modules文件夹下
let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let cssmin = require("gulp-clean-css");
let connect = require('gulp-connect');
let sass = require("gulp-sass");
let babel =require("gulp-babel");
let uglify = require("gulp-uglify");


// 复制images文件
gulp.task("copy-pic",async ()=>{
    gulp.src("./src/images/**/*")
    .pipe(gulp.dest("./dist/images"));
});
// 搭建服务器
gulp.task('server', function () {
    connect.server({
        root: './src',
        livereload: true
    });
});
// 二、监听
gulp.task("watch-all",async ()=>{
    // 2、压缩html
    gulp.watch("./src/*.html",async ()=>{
        gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,  
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true, 
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true, 
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest("./dist"));
    });
     //把php文件夹里的所有代码原封不动的复制到服务器目录下
     gulp.watch("./src/php/**/*",async ()=>{
        gulp.src("./src/php/**/*")
        .pipe(gulp.dest("./dist/php"));
    });
    // 压缩js
    gulp.watch(["./src/js/*.js","!./src/js/jquery-3.2.1.min.js"],async ()=>{
        gulp.src("./src/js/*.js")
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
    });    
    // 监听css文件
    gulp.watch("./src/css/**/*", async ()=>{
        gulp.src("./src/css/**/*")
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"))
    });
    //sass编译 
    gulp.watch("./src/css/*.scss",async ()=>{
        gulp.src("./src/css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"));
     });
});
