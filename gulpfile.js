const gulp  = require('gulp'),
  browserify  = require('browserify'),
  babelify  = require('babelify'),
  source  = require('vinyl-source-stream'),
  watch = require('gulp-watch'),
  nodemon = require('gulp-nodemon');

/*
  Create and setup a database user first!
  mysql> create database fantastic;
  # create user identified by password
  mysql> create user 'l33tdba'@'localhost' identified by 'w0rk5pac3';
  #give user to access to database.tablename or database.* (all)
  mysql> grant all privileges on fantastic.* to 'l33tdba'@'localhost';
 */
const db = require('knex')({
  client: process.env.DB_ADAPTER,
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USR,
    password : process.env.DB_PW,
    database: process.env.DB_NAME
  }
});

const DB_CREATE_ROLES_TABLE_QUERY = 'create table user_roles (' +
  'id int not null auto_increment,' +
  'name varchar(80) not null,' +
  'description varchar(255),' +
  'primary key (id)' +
  ');';
const DB_CREATE_USERS_TABLE_QUERY = 'create table user_accounts (' +
  'id int not null auto_increment,' +
  'name varchar(80) not null,' +
  'email varchar(255) not null,' +
  'password_hash char(60) BINARY not null,' +
  'registration_date date not null,' +
  'role int not null references user_roles(id),' +
  'primary key (id)' +
  ');';
const DB_DROP_ROLES_TABLE_QUERY = 'drop table user_roles;';
const DB_DROP_USERS_TABLE_QUERY = 'drop table user_accounts;';

watch(['./app_client/*.js'], () => {
  console.log('Client-side code modified; re-compiling ES2016 -> ES5')
  gulp.start('precompile')
});

gulp.task('precompile', () => {
  return browserify('./app_client/app.js')
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

// run via termina: gulp create_db_tables
gulp.task('db_create_tables', () => {
  let tag = 'SQL: ';

  function roleTableCallback(response) {
    console.log(tag + DB_CREATE_ROLES_TABLE_QUERY);
    console.log(response);
    createUserTable();
  }

  function createUserTable() {
    db.raw(DB_CREATE_USERS_TABLE_QUERY).then((userTableRessponse) => {
      console.log(tag + DB_CREATE_USERS_TABLE_QUERY);
      console.log(userTableRessponse);
    })
  }
  // note: nest tables that rely on foreign key constraints inside of async callbacks
  db.raw(DB_CREATE_ROLES_TABLE_QUERY).then(roleTableCallback);
});

// run via termina: gulp create_db_tables
gulp.task('db_drop_tables', () => {
  let tag = 'SQL: ';

  function roleTableCallback(response) {
    console.log(tag + DB_DROP_ROLES_TABLE_QUERY);
    console.log(response);
    createUserTable();
  }

  function createUserTable() {
    db.raw(DB_DROP_USERS_TABLE_QUERY).then((userTableRessponse) => {
      console.log(tag + DB_DROP_USERS_TABLE_QUERY);
      console.log(userTableRessponse);
    })
  }
  // note: nest tables that rely on foreign key constraints inside of async callbacks
  db.raw(DB_DROP_ROLES_TABLE_QUERY).then(roleTableCallback);
});

gulp.task('default', ['precompile', 'server']);