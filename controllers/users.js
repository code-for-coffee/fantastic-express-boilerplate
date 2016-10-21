const express = require('express');
let ctrl = express.Router();

/* GET usersCtrl listing. */
ctrl.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = ctrl;
