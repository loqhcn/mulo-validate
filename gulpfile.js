var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
        config:require('./webpack.config.js')
    }))
    .pipe(gulp.dest('dist/'));
});

