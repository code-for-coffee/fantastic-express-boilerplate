'use strict'

require('dotenv').config();

let gulp 		    = require('gulp'),
    browserify 	= require('browserify'),
    babelify 	  = require('babelify'),
    source 		  = require('vinyl-source-stream'),
    watch 		  = require('gulp-watch'),
    nodemon     = require('gulp-nodemon');

const db = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'l33tdba',
    password : 'w0rk5pac3',
    database : 'first_run'
  }
});

const DB_CREATE_QUERY = "";

watch(['./frontend/*.js'], () => {
  console.log('Client-side code modified; re-compiling ES2016 -> ES5')
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

gulp.task('create_db', () => {

});

gulp.task('default', ['precompile', 'server']);