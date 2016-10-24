// require testing libraries
let chai = require('chai'),             // http://chaijs.com/api/bdd/
  expect = chai.expect,               // http://chaijs.com/guide/styles/#expect
  should = require('chai').should(),  // http://chaijs.com/guide/styles/#should
  control = {};

var Role = require('.././models/Role');

describe('CRUD on a RoleModel', function () {

  beforeEach(function() {
    control.role = {
      name: 'Commander',
      description: 'Shepard'
    }
  });

  afterEach(function() {
    control.role = {};
  })

  it('can create a new Object', function() {
    let model = new Role(control.role).save().then((role) => {
        should.exist(role);
        should.exist(role.name);
        should.exist(role.description);
    })
  });

  it('can get a list of ALL Objects', function() {
    let myObjectId;
    Role.create(control.role, function(error, role) {
      should.not.exist(error);
      should.exist(role);
      should.exist(role.name);
      should.exist(role.description);
      control.testObjectID = role['id'];
    });
    // now time to test for all
    Role.find({}, function(error, roles) {
      should.not.exist(error);
      should.exist(roles);
      expect(roles.length).to.be.above(0);
    });
  });

  it('can get an individual Object by ID', function() {
    // ok, we have the ID.. time to find it
    Role.findById(control.testObjectID, function(error, role) {
      should.not.exist(error);  // there better not be an error!!!!!
      should.exist(role);      // we should get back our mongoDB object
      should.exist(role.name);
      should.exist(role.description);
    });
  });

  it('can update an object Object by ID', function() {
    let newName = 'Spacelord';
    Role.findByIdAndUpdate(control.testObjectID,
      { name: newName },
      { new: true }, // this allows us to see the updated object
      function(error, role) {
        should.not.exist(error);  // there better not be an error!!!!!
        should.exist(role);      // we should get back our mongoDB object
        should.exist(role.name);
        should.exist(role.description);
        expect(role.name).to.equal(newName);
      });
  });

  it('can destroy an object Object by ID', function() {
    // remove our object
    Role.findByIdAndRemove(control.testObjectID,
      function(error, role) {
        should.not.exist(error);
        should.exist(role);
        should.exist(role.name);
        should.exist(role.description);
        expect(role.name).to.equal(newName);
      });
    // now search for it... it should not exist
    // ok, we have the ID.. time to find it
    Role.findById(control.testObjectID, function(error, role) {
      should.not.exist(role);   // this should not exist now...
    });
  });


});