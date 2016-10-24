/**
 * Created by codeforcoffee on 10/23/16.
 */
// taking heavy inspiration from the ASP.NET controller
// https://msdn.microsoft.com/en-us/library/system.web.mvc.controller_properties(v=vs.118).aspx

class Controller {
  const express = require('express');
  this.actions = [
    "get",
    "post",
    "put",
    "patch",
    "delete"
  ];
  this.routes = [];

  constructor() {
    this.router = express.Router();
  };

  createActionRoute(actionVerb,
                    route,
                    filter,
                    onExecuting,
                    onSuccess,
                    onFail) {
    if (validateHttpAction(actionVerb)) {
      this.router[actionVerb]().(route, (request, response, next) {
        filter(req.params, req.body);
        onExecuting(onSuccess, onFail);
      });
      this.routes.push(`${actionVerb} : ${route}`);
    }
  };

  validateHttpAction(actionVerb) {
    let flag = false;
    this.actions.forEach((verb) => {
      if (verb === actionVerb) {
        flag = true;
      }
    })
    return flag;
  };

  toString() {
    return `Controller with routes ${this.routes.toString()}`;
  }
};

module.exports = Controller;