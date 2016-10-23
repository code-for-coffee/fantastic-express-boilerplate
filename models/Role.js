const db = require('./db');

const bookshelf = require('bookshelf')(db);

let UserModel = require('./User');

//console.log('orm loaded and ready');

let Role = bookshelf.Model.extend({
  tableName: 'user_roles',
  users: () => {
    return this.hasMany(UserModel);
  }
});

//console.log(Role);
console.log('role model defined & exporting');

module.exports = Role;