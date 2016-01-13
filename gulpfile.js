var gulp = require('gulp');

// Include Plugins
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile & Minify Sass
gulp.task('style', function() {
    return gulp.src('assets/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/dist'))
        .pipe(rename('main.min.css'))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('assets/dist/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/css/*.scss', ['style']);
});

// Default Task
gulp.task('default', ['lint', 'style', 'scripts', 'watch']);
