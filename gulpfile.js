const gulp = require('gulp');
const del = require("del");
const less = require("gulp-less");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const minify = require("gulp-minify");

/***********
 * Clean the dist folder
 ***********/
gulp.task('clean', function () {
    return del(["dist/**"]);
});

/***********
 * Compile less to css into one css file in dist
 ***********/
gulp.task('less-prod', function () {
    return gulp.src("src/assets/styles/**/*.less")
        .pipe(less())
        .pipe(concat("style.css"))
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/assets/styles/"))
});

//No minifying
gulp.task('less-dev', function () {
    return gulp.src("src/assets/styles/**/*.less")
        .pipe(less())
        .pipe(concat("style.css"))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("dist/assets/styles/"))
});

/***********
 * Copy files which aren't modified in dist
 ***********/
gulp.task('copy-prod', function () {
    return gulp.src(["src/**", "!src/assets/styles/**", "!src/js/**"])
        .pipe(gulp.dest("dist"))
});

//Include perfect copy of JS files
gulp.task('copy-dev', function () {
    return gulp.src(["src/**", "!src/assets/styles/**"])
        .pipe(gulp.dest("dist"))
});

/***********
 * Minify JS files in dist
 ***********/
gulp.task('js-prod', function () {
    return gulp.src(["src/js/**"])
        .pipe(minify({ext: {min: ".js"}, noSource: true}))
        .pipe(gulp.dest("dist/js/"))
});

/***********
 * Clean and generate a new dist folder for production
 ***********/
/* Clean and generate a new dist folder */
gulp.task('build-prod', ["clean"], function () {
    gulp.start("less-prod");
    gulp.start("js-prod");
    gulp.start("copy-prod");
});

/***********
 * Clean and generate a new dist folder for development (without minifying)
 ***********/
gulp.task('build-dev', ["clean"], function () {
    gulp.start("less-dev");
    gulp.start("copy-dev");
});

/***********
 * Update the files on the fly (without minifying)
 ***********/
gulp.task('watch', function () {
    gulp.watch('src/assets/styles/**/*.less', ['less-dev']);
    gulp.watch(["src/**", "!src/assets/styles/**"], function (obj) {
        console.log(obj.type + " " + obj.path);
        gulp.src(obj.path, {"base": "./src/"})
            .pipe(gulp.dest('./dist'));

    });
});