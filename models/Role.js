const db = require('./db');

const bookshelf = require('bookshelf')(db);

//console.log('orm loaded and ready');

let Role = bookshelf.Model.extend({
  tableName: 'user_roles'
});

//console.log(Role);
//console.log('model defined & exporting');

module.exports = Role;