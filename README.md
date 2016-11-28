# Fantastic Express Boilerplate (ES2015) 

[![Build Status](https://travis-ci.org/code-for-coffee/fantastic-express-boilerplate.svg?branch=master)](https://travis-ci.org/code-for-coffee/fantastic-express-boilerplate)

> This boilerplate is written in ES2015 and requires Node 6.x+

This is a fantastic Node/Express/Bookshelf+SQL/Role-Based Authentication boilerplate. It is designed to get you up-and-running on your own project without having to setup the basic user/role models, tasks, and more.

#### Getting Started

Git clone this repository and run `npm install && npm start`.

#### Tests

Tests are written with Mocha/Chai. A boilerplate CRUD test is included. To run them, you may run `npm test`.

## Behind the Scenes

#### .env

A `.env` file should be created at the root of your project. If this file exists, it will look for the following key/values:

```bash
DB_HOST=localhost
DB_USR=l33tdba
DB_PW=w0rk5pac3
DB_NAME=fantastic
DB_ADAPTER=mysql      # any knex adapter works
```

#### Gulp

Gulp powers the base server for this boilerplate. Inside of the `gulpfile.js` are the following tasks:
* `precompile` - Transforms `app_client/` Javascript files using Babel for ES2015 support & places the result inside of `/public/app-build.js`
* `watch` - watches for file changes in `app_client/` & re-runs `precompile`
* `server` - launches `node ./bin/www` using Nodemon & restarts when server-side code is recompiled
* `create_db_tables` - creates the SQL tables specified in the `const` variables in the gulfpile. (Only ran externally via `gulp create_db_tables`)
* `drop_db_tables` - drops the SQL tables specified in the `const` variables in the gulpfile. (Only ran externally via `gulp drop_db_tables`)


#### Folder Structure & Organization

* `bin/` contains the server scripts
* `controllers/` contains controllers for HTTP endpoints
* `app_client/` contains your custom client-side application code (this is transpiled to ES2015 by Babel into `public/javascripts/app-build.js`
* `models/` contains all of your database & SQL specific scripts
* `public/` contains all folders & files exposed to `/` when the server is running
* `test/` contains Mocha/Chai unit tests
* `views/` contain Handlebars views


#### SQL Support

This boilerplate was designed to work with SQL (sorry, NoSQL fans - just replace the `models/*.js` with whatever you need). 

