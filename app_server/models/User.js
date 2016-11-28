const db = require('./db');
const bookshelf = require('bookshelf')(db);
const BCrypt = require('bcryptjs');
const SALT_FACTOR = 10;

let RoleModel = require('./Role');

//console.log('orm loaded and ready');

let User = bookshelf.Model.extend({
  tableName: 'user_accounts',
  initialize: function() {
    this.on('creating', (model, attrs, options) => {
      // console.log(model);
      // console.log('..');
      // console.log(attrs);
    });
    this.on('creating', this.hashPassword, this);
  },
  role: () => {
    return this.belongsTo(RoleModel);
  },
  hashPassword: (model, attrs, options) => {
    return new Promise((resolve, reject) => {
      let pattern = /^\S+@\S+$/;
      let isValidEmail = pattern.test(model.attributes['email']);
      if (!isValidEmail) reject(new Error('invalid email specified'));
      BCrypt.hash(model.attributes['password_hash'], SALT_FACTOR, (err, hash) => {
        if (err) reject(err);
        model.set('registration_date', new Date().toISOString().slice(0, 19).replace('T', ' '));
        model.set('password_hash', hash);
        resolve(hash);
      })
    })
  },
  comparePasswordSync: (attemptedPassword, passwordHash) => {
    return BCrypt.compareSync(attemptedPassword, passwordHash);
  },
  comparePassword: (attemptedPassword, passwordHash, callback) => {
    BCrypt.compare(attemptedPassword, passwordHash, (err, isMatch) => {
      if (err) return callback(err);
      else callback(err);
    })
  }
});

console.log('user model defined & exporting');

module.exports = User;