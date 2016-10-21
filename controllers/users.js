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

ctrl.get('/create', (req, res, next) => {
  let model = new UserModel({
      name: 'testy mcTesting',
      email: 'somewhere@someplace.net',
      "password_hash": 'lolgiggles42',
      "registration_date": new Date().toISOString().slice(0, 19).replace('T', ' '),
      role: 1
    })
    .save()
    .then((model) => {
      console.log(model);
      console.log('woot?')
      res.json(model);
    });
});

module.exports = ctrl;

