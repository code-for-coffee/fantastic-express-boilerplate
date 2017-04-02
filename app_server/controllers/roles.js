/**
 * @class RoleModel
 * @description Bookshelf.js Model for roles table
 */
let RoleModel = require('../models/Role');

/**
 * @class RolesController
 * @description Controller designed to listen to various REST requests and build a proper JSON response for the Roles database table.
 */
class RolesController {

  /**
   * @memberOf controllers/RolesController
   * @method getAllRequest
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getAllRequest(req, res, next) {
    RoleModel.collection().fetch().then((models) => {
      res.json(this.buildResponse(models));
    })
  }

  /**
   * @memberOf RolesController
   * @method getByIdRequest
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getByIdRequest(req, res, next) {
    RoleModel.where({ id: req.params.id })
      .fetch()
      .then((model) => {
        res.json(this.buildResponse(model));
      })
  }
  
  /**
   * @memberOf RolesController
   * @method createRequest
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
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

  /**
   * @memberOf RolesController
   * @method updateRequest
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
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

  /**
   * @memberOf RolesController
   * @method deleteRequest
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
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
  /**
   * @memberOf RolesController
   * @method buildResponse
   * @param {*} model 
   * @returns responseModel
   */
  buildResponse(model) {
    if (!model) {
      return this.buildResponse('No models exist in database matching your request.')
    } else {
      return model;
    }
  }

  /**
   * @memberOf RolesController
   * @method buildResponseJSON
   * @param {*} msg 
   * @returns responseJson
   */
  buildResponseJSON(msg) {
    return {
      'status': 400,
      data: {
        'message': msg
      }
    }
  }

  /* mimic constrains set in SQL databases for req objects */
  /**
   * @memberOf RolesController
   * @method validateCreateRequest
   * @param {*} req 
   * @returns boolean
   */
  validateCreateRequest(req) {
    let name = req.body['name'],
      description = req.body['description'];
    if (!name) return false;
    if (name.length <= 80
      && name.length > 0
      && description.length <= 255) return true;
    return false;
  }

  /**
   * @memberOf RolesController
   * validateUpdateRequest
   * @param {*} req 
   * @returns boolean
   */
  validateUpdateRequest(req) {
    let name = req.body['name'],
      description = req.body['description'];
    if (name || description) return true;
    return false;
  }

  /**
   * @memberOf RolesController
   * @method createViewModel
   * @param {*} body 
   * @returns object
   */
  createViewModel(body) {
    return {
      'name': body['name'],
      'description': body['description']
    }
  }

  /**
   * @memberOf RolesController
   * @method updateViewmodel
   * @param {*} body 
   * @returns object
   */
  updateViewmodel(body, model) {
    return {
      'name': body ['name'] || model.get('name'),
      'description': body['description'] || model.get('description')
    }
  }
}

module.exports = RoleController;