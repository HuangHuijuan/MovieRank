var pg = require('pg');
var db = require('../db');

var client = new pg.Client({
  connectionString: process.env.DATABASE_URL || db.connectionString,
  ssl: true
});

client.connect();

module.exports = {
  _insert(insertQuery, callback) {
    console.log("Log: insert");
    client.query(insertQuery, function (error, results) {
      if (error) {
        console.log("Insert Error: " + error.message);
        client.end();
        return;
      }
      if (callback && results.rowCount !== 0) {
        callback(results.rows[0].userid);
      }
      console.log('Inserted: ' + results.rowCount + ' row.');
      console.log('insert success...\n');
    });

  },

  _select(selectQuery, callback) {
    console.log("Log: select");
    client.query(selectQuery, function (error, results, fields) {
      if (error) {
        console.log("ClientReady Error: " + error.message);
        client.end();
      }
      console.log('Get ' + results.rowCount + ' results.');
      callback(error ? [] : results.rows);
    });
  },

  _update(updateQuery) {
    console.log("Log: update");
    client.query(updateQuery, function (error, results) {
      if (error) {
        console.log("Update Error: " + error.message);
        client.end();
        return;
      }
      console.log('update success...\n');
    });
  },

  _delete(deleteQuery) {
    console.log("Log: delete");
    client.query(deleteQuery, function (error, results) {
      if (error) {
        console.log("Delete Error: " + error.message);
        client.end();
        return;
      }
      console.log('delete success...\n');
    });
  }
};