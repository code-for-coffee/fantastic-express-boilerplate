/**
 * Created by codeforcoffee on 11/27/16.
 */
const express = require('express');
const RoleController = require('../controllers/roles');

let router = express.Router();
let ctrl = new RoleController();

/* GET * listing => [] */
router.get('/', (req, res, next) => {
  ctrl.getAllRequest(req, res, next);
});

/* GET by id => {} */
router.get('/:id', (req, res, next) => {
  ctrl.getByIdRequest(req, res, next);
});

/* POST => {} */
router.post('/', (req, res, next) => {
  ctrl.createRequest(res, res, next);
});

/* PUT by id => {} */
router.put('/:id', (req, res, next) => {
  ctrl.updateRequest(req, res, next);
});

/* PATCH by id => {} */
router.patch('/:id', (req, res, next) => {
  ctrl.updateRequest(req, res, next);
});

/* DELETE by id => {} */
router.delete('/:id', (req, res, next) => {
  ctrl.deleteRequest(req, res, next);
});

module.exports = router;