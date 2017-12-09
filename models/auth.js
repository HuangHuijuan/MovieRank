const validator = require('validator');
const userModel = require('./user.js');

module.exports = {
  login(email, password, callback) {
    let errors = [];
    if (!validator.isLength(email, {min: 1, max: 50}) || !validator.isEmail(email)) {
      errors.push('Invalid email');
    }
    if (!validator.isLength(password, {min: 1, max: 50})) {
      errors.push('Invalid password');
    }
    if (errors.length !== 0) {
      callback(errors);
      return;
    }

    userModel.findUser(email, user => {
      if (user && user.password === password) {
        callback(null, user);
      } else {
        callback([`email and password don't match`]);
      }
    });
  },

  register(email, password, name, callback) {
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push('Invalid email');
    }
    if (!validator.isLength(password, {min: 1, max: 50})) {
      errors.push('Invalid password');
    }
    if (!validator.isLength(name, {min: 1, max: 50})) {
      errors.push('Invalid name');
    }
    // if (genres.length < 3) {
    //   errors.push('You must select at least 3 geners');
    // }
    if (errors.length !== 0) {
      callback(errors);
      return;
    }

    userModel.findUser(email, user => {
      if (user) {
        callback(['Email already exist']);
      } else {
        userModel.addUser(email, name, password, '', userid => {
          callback(null, userid);
        });
      }
    });
  }
};
