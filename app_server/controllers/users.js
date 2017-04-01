'use strict';


const express = require('express');
let ctrl = express.Router();
let UserModel = require('../models/User');

/* GET usersCtrl listing. */
ctrl.get('/', (req, res, next) => {
  UserModel.collection().fetch().then((models) => {
    res.json(models);
  })
});

// router.get('/:id', (req, res, next) => {
//   UserModel.where({ id: req.params.id })
//     .fetch()
//     .then((model) => {
//       res.json(model);
//   })
// });

ctrl.get('/create', (req, res, next) => {
  console.log('hi')
  console.log(UserModel)
  let model = new UserModel({
    name: 'testy mcTesting',
    email: 'somewhera@sdsomeplace.net',
    'password_hash': 'lolgiggles42',
    role: 1
  })
    .save()
    .then((model) => {
      console.log(model);
      res.json(model);
    });
});

module.exports = ctrl;

