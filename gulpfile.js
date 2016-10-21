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
    host : process.env.DB_HOST,
    user : process.env.DB_USR,
    password : process.env.DB_PW
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