'use strict'

let gulp 		= require('gulp'),
  browserify 	= require('browserify'),
  babelify 	= require('babelify'),
  source 		= require('vinyl-source-stream'),
  watch 		= require('gulp-watch'),
  nodemon   = require('gulp-nodemon');

watch(['./frontend/*.js',
  './gulpfile.js'], () => {
  console.log('Client-side code/style modified; re-compiling.')
  gulp.start('precompile')
});

gulp.task('precompile', () => {
  return browserify('./src/app.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/public/js/'))
});

gulp.task('server', () => {
  nodemon({
    script: 'app.js'
    , ext: 'js hbs scss sql'
    , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['server']);