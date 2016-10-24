/**
 * Created by codeforcoffee on 10/23/16.
 */
const express = require('express');
let ctrl = express.Router();

class BaseController {

  constructor(model, modelAttributes) {
    /* GET * listing => [] */
    ctrl.get('/', (req, res, next) => {
      getAllRequest(req, res, next);
    });

    /* GET by id => {} */
    ctrl.get('/:id', (req, res, next) => {
      getByIdRequest(req, res, next);
    });

    /* POST => {} */
    ctrl.post('/', (req, res, next) => {
      createRequest(res, res, next);
    });

    /* PUT by id => {} */
    ctrl.put('/:id', (req, res, next) => {
      updateRequest(req, res, next);
    });

    /* PATCH by id => {} */
    ctrl.patch('/:id', (req, res, next) => {
      updateRequest(req, res, next);
    });

    /* DELETE by id => {} */
    ctrl.delete('/:id', (req, res, next) => {
      deleteRequest(req, res, next);
    });
  }


  /* private base controller methods; will abstract later */
  function buildResponse(model) {
    if (!model) {
      return buildResponse('No models exist in database matching your request.')
    } else {
      return model;
    }
  }

  function buildResponseJSON(msg) {
    return {
      'status': 400,
      data: {
        'message': msg
      }
    }
  };

  /* mimic constrains set in SQL databases for req objects */
  function validateCreateRequest(req) {
    let name = req.body['name'],
      description = req.body['description'];
    if (!name) return false;
    if (name.length <= 80
      && name.length > 0
      && description.length <= 255) return true;
    return false;
  };

  function validateUpdateRequest(req) {
    let name = req.body['name'],
      description = req.body['description'];
    if (name || description) return true;
    return false;
  };

  function createViewModel(body) {
    return {
      'name': body['name'],
      'description': body['description']
    }
  };

  function updateViewmodel(body, model) {
    return {
      'name': body ['name'] || model.get('name'),
      'description': body['description'] || model.get('description')
    }
  };

}

module.exports = BaseController;




/* private route functions */
function getAllRequest(req, res, next) {
  RoleModel.collection().fetch().then((models) => {
    res.json(buildResponse(models));
})
};

function getByIdRequest(req, res, next) {
  RoleModel.where({ id: req.params.id })
    .fetch()
    .then((model) => {
    res.json(buildResponse(model));
})
};

function createRequest(req, res, next) {
  if(validateCreateRequest(req)) {
    let model = new RoleModel(
      createViewModel(req.body)
    )
      .save()
      .then(function (model) {
        res.json(buildResponse(model));
      });
  } else {
    res.json(
      buildResponseJSON('Request Body missing required properties.')
    );
  }
};

function updateRequest(req, res, next) {
  if(validateUpdateRequest(req)) {
    RoleModel.forge({id: req.params.id})
      .fetch({required: true})
      .then((role) => {
      role.save(updateViewmodel(req.body, role))
      .then((updatedRole) => {
      res.json(buildResponse(updatedRole));
  })
  });
  } else {
    res.json(
      buildResponseJSON('Request Body missgiing required properties.')
    );
  }
};

function deleteRequest(req, res, next) {
  if (req.params.id) {
    RoleModel.forge({id: req.params.id})
      .fetch({required: true})
      .then((role) => {
      res.json(buildResponseJSON(`Entry ${ req.params.id } removed from database`))
  });
  } else {
    res.json(
      buildResponseJSON('No entry matches the ID you provided (or did you provide one?)')
    );
  }
};


