/**
 * @class HomeController
 * @description Expres Router dedicated for handling root level requests.
 */

/**
 * @constant ExpressApp
 */
const express = require('express');
let ctrl = express.Router();

/**
 * @namespace HomeController
 * @description returns a Handlebars view with optional data to render.
 * @method get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Fantastic Express Boilerplate' });
});

module.exports = ctrl;
