const express = require('express');
let ctrl = express.Router();
let RoleModel = require('../models/Role');

/* GET rolesCtrl listing. */
ctrl.get('/', (req, res, next) => {
  RoleModel.collection().fetch().then((models) => {
    res.json(models);
  })
});

// ctrl.get('/:id', (req, res, next) => {
//   RoleModel.where({ id: req.params.id })
//     .fetch()
//     .then((model) => {
//       res.json(model);
//   })
// });

ctrl.post('/', (req, res, next) => {
  console.log(req.body);
  res.send('nyi');
});

ctrl.put('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send('nyi');
});

ctrl.patch('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send('nyi');
});

ctrl.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send('nyi');
});

ctrl.get('/create', (req, res, next) => {
  console.log('cud')
  let model = new RoleModel({
    name: 'user',
    description: 'Plebians'
  })
  .save()
  .then(function (model) {
    res.json(model);
  });
});

module.exports = ctrl;

