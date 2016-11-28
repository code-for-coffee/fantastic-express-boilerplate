'use strict'

require('dotenv').config();

/*
 Create and setup a database user first!
 mysql> create database fantastic;
 # create user identified by password
 mysql> create user 'l33tdba'@'localhost' identified by 'w0rk5pac3';
 #give user to access to database.tablename or database.* (all)
 mysql> grant all privileges on fantastic.* to 'l33tdba'@'localhost';
 */
const db = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USR,
    password : process.env.DB_PW,
    database: process.env.DB_NAME
  }
});

console.log('db module loaded & exporting');
//
module.exports = db;