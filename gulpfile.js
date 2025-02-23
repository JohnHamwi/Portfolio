// Import required modules
var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

// Task to process JavaScript files
gulp.task('scripts', function() {
    return gulp.src('./js/scripts.js') // Source file
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel({
            presets: [['@babel/env', { modules: false }]] // Transpile ES6+ to ES5
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/' // Preserve comments starting with '!'
            }
        }))
        .pipe(rename({ extname: '.min.js' })) // Rename to .min.js
        .pipe(gulp.dest('./js')); // Destination folder
});

// Task to process SCSS files
gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss') // Source file
        .pipe(wait(250)) // Wait for 250ms
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Compile SCSS to CSS and compress
        .pipe(gulp.dest('./css')); // Destination folder
});

// Watch task to monitor changes in JS and SCSS files
gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts')); // Watch JS files
    gulp.watch('./scss/styles.scss', gulp.series('styles')); // Watch SCSS files
});