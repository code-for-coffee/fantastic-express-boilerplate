const db = require('./db');

const bookshelf = require('bookshelf')(db);

//console.log('orm loaded and ready');

let User = bookshelf.Model.extend({
  tableName: 'user_accounts'
});

//console.log(User);
//console.log('model defined & exporting');

module.exports = User;