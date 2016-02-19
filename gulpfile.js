var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
    browserify('src/main.js', { debug: true })
        .transform("babelify", { presets: ['es2015'] })
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);
