const express = require('express');
let ctrl = express.Router();
let RoleModel = require('../models/Role');

/* mimic constrains set in SQL databases for req objects */
function validateRequest(req) {
  let name = req.body['name'],
      body = req.body['body'];
  if (name.length <= 80
    && name.length > 0
    && description.length <= 255) return true;
  return false;
}

/* GET * listing => [] */
ctrl.get('/', (req, res, next) => {
  RoleModel.collection().fetch().then((models) => {
     res.json(buildResponse(models));
  })
});

/* GET by id => {} */
ctrl.get('/:id', (req, res, next) => {
  RoleModel.where({ id: req.params.id })
    .fetch()
    .then((model) => {
      res.json(buildResponse(model));
  })
});

/* POST => {} */
ctrl.post('/', (req, res, next) => {
  if(validateRequest(req)) {
    let model = new RoleModel({
      name: 'user',
      description: 'Plebians'
    })
    .save()
    .then(function (model) {
      res.json(buildResponse(model));
    });
  } else {
    res.json(
      sendInvalidResponseJSON('Request Body missing required properties.')
    );
  }
});

/* PUT by id => {} */
ctrl.put('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send('nyi');
});

/* PATCH by id => {} */
ctrl.patch('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send('nyi');
});

/* DELETE by id => {} */
ctrl.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send('nyi');
});

/* private functions */
function buildResponse(model) {
  if (!model) {
    return sendInvalidResponseJSON('No models exist in database matching your request.')
  } else {
    return model;
  }
}

function sendInvalidResponseJSON(msg) {
  return {
    'status': 400,
    data: {
      'message': msg
    }
  }
}

module.exports = ctrl;

