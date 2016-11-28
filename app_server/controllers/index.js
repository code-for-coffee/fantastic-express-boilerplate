const express = require('express');
let ctrl = express.Router();

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Fantastic Express Boilerplate' });
});

module.exports = ctrl;
