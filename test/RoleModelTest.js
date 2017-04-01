// require testing libraries
let chai = require('chai'),             // http://chaijs.com/api/bdd/
  expect = chai.expect,               // http://chaijs.com/guide/styles/#expect
  should = require('chai').should(),  // http://chaijs.com/guide/styles/#should
  control = {};

var Role = require('../app_server/models/Role');

describe('CRUD on a RoleModel', () => {

  beforeEach(() => {
    control.role = {
      name: 'Commander',
      description: 'Shepard'
    }
  });

  afterEach(() => {
    control.role = {};
  })

  it('can create a new Object', () => {
    let model = new Role(control.role).save().then((role) => {
      //console.log(role)
      should.exist(role);
      should.exist(role.attributes.name);
      should.exist(role.attributes.description);
      control.id = role.attributes.id;
    })
  });

  it('can get a list of ALL Objects', () => {
    // now time to test for all
    Role.collection().fetch().then((models) => {
      should.exist(models);
      expect(models.length).to.be.above(0);
    })
  });

  it('can get an individual Object by ID', () => {
    // ok, we have the ID.. time to find it
    //console.log(control)
    Role.where({ id: control.id })
      .fetch()
      .then((model) => {
        should.exist(model);
        should.exist(model.attributes.name);
        should.exist(model.attributes.description);
      })
  });

  it('can update an object Object by ID', () => {
    let newName = 'Spacelord';
    let newDesc = 'Ruler of all';

    Role.forge({id: control.id})
      .fetch({required: true})
      .then((role) => {
        role.save({
          name: newName || role.get('name'),
          description: newDesc || role.get('description')
        }).then((updatedModel) => {
          console.log(updatedModel)
          should.exist(updatedModel);
          should.exist(updatedModel.attributes.name);
          should.exist(updatedModel.attributes.description);
          expect(updatedModel.attributes.name).to.equal(newName);
          expect(updatedModel.attributes.description).to.equal(newDesc);
        })
      });
  });

  it('can destroy an object Object by ID', function() {
    Role.forge({id: control.id})
      .fetch({required: true})
      .then((role) => {
        //console.log(role)
        should.exist(role);
        should.exist(role.attributes.name);
        should.exist(role.attributes.description);
        role.destroy().then((modelData) => {
          should.not.exist(model.attributes.name);   // this should not exist now...
          should.not.exist(model.attributes.description);
        })
      })
  });
});