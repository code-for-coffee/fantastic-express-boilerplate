const express = require('express');
let ctrl = express.Router();
let UserModel = require('../models/User');


/* GET usersCtrl listing. */
ctrl.get('/', (req, res, next) => {
  UserModel.collection().fetch().then((models) => {
    res.json(models);
  })
});

ctrl.get('/:id', (req, res, next) => {
  UserModel.where({ id: req.params.id })
    .fetch()
    .then((model) => {
      res.json(model);
  })
});

module.exports = ctrl;

