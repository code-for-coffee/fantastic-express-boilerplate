let RoleModel = require('../models/Role');

class RoleController {

  constructor() {

  }
  /* controller functions */
  getAllRequest(req, res, next) {
    RoleModel.collection().fetch().then((models) => {
      res.json(this.buildResponse(models));
    })
  }

  getByIdRequest(req, res, next) {
    RoleModel.where({ id: req.params.id })
      .fetch()
      .then((model) => {
        res.json(this.buildResponse(model));
      })
  }

  createRequest(req, res, next) {
    if(this.validateCreateRequest(req)) {
      let model = new RoleModel(
        this.createViewModel(req.body)
      )
        .save()
        .then(function (model) {
          res.json(this.buildResponse(model));
        });
    } else {
      res.json(
        this.buildResponseJSON('Request Body missing required properties.')
      );
    }
  }

  updateRequest(req, res, next) {
    if(this.validateUpdateRequest(req)) {
      RoleModel.forge({id: req.params.id})
        .fetch({required: true})
        .then((role) => {
          role.save(this.updateViewmodel(req.body, role))
        .then((updatedRole) => {
          res.json(this.buildResponse(updatedRole));
        })
        });
    } else {
      res.json(
        this.buildResponseJSON('Request Body missing required properties.')
      );
    }
  }

  deleteRequest(req, res, next) {
    if (req.params.id) {
      RoleModel.forge({id: req.params.id})
        .fetch({required: true})
        .then((role) => {
          res.json(this.buildResponseJSON(`Entry ${ req.params.id } removed from database`))
        });
    } else {
      res.json(
        this.buildResponseJSON('No entry matches the ID you provided (or did you provide one?)')
      );
    }
  }

  /* private base controller methods; will abstract later */
  buildResponse(model) {
    if (!model) {
      return this.buildResponse('No models exist in database matching your request.')
    } else {
      return model;
    }
  }

  buildResponseJSON(msg) {
    return {
      'status': 400,
      data: {
        'message': msg
      }
    }
  }

  /* mimic constrains set in SQL databases for req objects */
  validateCreateRequest(req) {
    let name = req.body['name'],
      description = req.body['description'];
    if (!name) return false;
    if (name.length <= 80
      && name.length > 0
      && description.length <= 255) return true;
    return false;
  }

  validateUpdateRequest(req) {
    let name = req.body['name'],
      description = req.body['description'];
    if (name || description) return true;
    return false;
  }

  createViewModel(body) {
    return {
      'name': body['name'],
      'description': body['description']
    }
  }

  updateViewmodel(body, model) {
    return {
      'name': body ['name'] || model.get('name'),
      'description': body['description'] || model.get('description')
    }
  }

}

module.exports = RoleController;


