const db = require('./db');

const bookshelf = require('bookshelf')(db);

let RoleModel = require('./Role');

//console.log('orm loaded and ready');

let User = bookshelf.Model.extend({
  tableName: 'user_accounts',
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      console.log(model);
      console.log('..');
      console.log(attrs);
    });
  },
  role: () => {
    return this.belongsTo(RoleModel);
  }
});

//console.log(User);
//console.log('model defined & exporting');

module.exports = User;