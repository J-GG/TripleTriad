const gulp = require('gulp');
const del = require("del");
const less = require("gulp-less");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");

gulp.task('less', function () {
    return gulp.src("src/assets/styles/**/*.less")
        .pipe(less())
        .pipe(concat("style.css"))
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/assets/styles/"))
});

gulp.task('copy', function () {
    return gulp.src(["src/**", "!src/assets/styles/**"])
        .pipe(gulp.dest("dist"))
});

gulp.task('clean', function () {
    return del(["dist/**"]);
});

/* Clean and generate a new dist folder */
gulp.task('build', ["clean"], function () {
    gulp.start("less");
    gulp.start("copy");
});

/* Update the dist folder on the fly */
gulp.task('dev', function () {
    gulp.watch('src/assets/styles/**/*.less', ['less']);
    gulp.watch(["src/**", "!src/assets/styles/**"], function (obj) {
        console.log(obj.type + " " + obj.path);
        gulp.src(obj.path, {"base": "./src/"})
            .pipe(gulp.dest('./dist'));

    });
});