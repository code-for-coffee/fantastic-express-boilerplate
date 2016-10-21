'use strict'

let gulp 		= require('gulp'),
  browserify 	= require('browserify'),
  babelify 	= require('babelify'),
  source 		= require('vinyl-source-stream'),
  watch 		= require('gulp-watch'),
  nodemon   = require('gulp-nodemon');

watch(['./frontend/*.js'], () => {
  console.log('Client-side code/style modified; re-compiling.')
  gulp.start('precompile')
});

gulp.task('precompile', () => {
  return browserify('./frontend/app.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('app-build.js'))
    .pipe(gulp.dest('./public/javascripts/'))
});

gulp.task('server', () => {
  nodemon({
    script: './bin/www',
    ext: 'js hbs scss sql'
    // , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['precompile', 'server']);