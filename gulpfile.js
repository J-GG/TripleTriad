var gulp = require('gulp');
var less = require("gulp-less");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");

gulp.task('less', function() {
	return gulp.src("assets/styles/*.less")
	.pipe(less())
	.pipe(rename({suffix: ".min"}))
	.pipe(cleanCSS())
	.pipe(gulp.dest("assets/styles/"))
});

gulp.task('build', function() {
	gulp.watch('assets/styles/*.less', ['less']);
});