const db_accessor = require('./db_accessor.js');

module.exports = {
  findUser(email, callback) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    };

    db_accessor._select(query, res => {
      if (res.length != 0) {
        const user = {
          userid: res[0].userid,
          email: res[0].email,
          username: res[0].username,
          password: res[0].password
        };
        callback(user);
      } else {
        callback();
      }
    })
  },

  addUser(email, username, pwd, genres, callback) {
    // const str = genres.join('|');
    const str = '';
    const query = {
      text: 'INSERT INTO Users(email, username, password, genre) VALUES ($1, $2, $3, $4) RETURNING userid',
      values: [email, username, pwd, str]
    };
    db_accessor._insert(query, callback);
    //db_accessor._insert(query, uid => {
    // genres.forEach(element => {
    // 	const query = {
    // 		text: 'INSERT INTO Genres(userid, genre) VALUES ($1, $2)',
    // 		values: [uid, element]
    // 	};
    // 	db_accessor._insert(query);
    // });
    //});
  }
};
