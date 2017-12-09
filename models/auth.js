const validator = require('validator');
const userModel = require('./user.js');

module.exports = {
  login(email, password, callback) {
    // const email = request.body.email;
    // const password = request.body.password;
    // const email = '123@gmail.com';
    // const password = '123';
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
      console.log(user);
      if (user && user.password === password) {
        callback(null, user.userId);
      } else {
        callback(['email and password don\'t match']);
      }
    });
  },

  register(email, password, callback) {
    // const email = '123@gmail.com';
    // const password = '123';
    // const username = 'Alice';
    // const genres = ['Romantics', 'Humor', 'Actions'];

    const errors = [];
    if (!validator.isLength(password, {min: 1, max: 50})) {
      errors.push('Invalid password');
    }
    // if (genres.length < 3) {
    //   errors.push('You must select at least 3 geners');
    // }
    // if (!validator.isLength(username, {min: 1, max: 50})) {
    //   errors.push('Invalid username');
    // }
    if (!validator.isEmail(email)) {
      errors.push('Invalid email');
    }
    if (errors.length !== 0) {
      callback(errors);
      return;
    }

    userModel.findUser(email, user => {
      if (user) {
        callback(['Email already exist'], user.userid);
      } else {
        userModel.addUser(email, '', password, '', (userid) => {
          callback(null, userid);
        });
      }
    });
  }
};
