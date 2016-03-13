'use strict';

var config = require('./config');
var pg = require('pg');

console.log('connection', config.dbConnection);
var conString = config.dbConnection;
//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT keyword_id, keyword, usage from KEYWORDS order by usage', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    
    var row = result.rows[0];
    console.log(row.keyword_id, row.keyword, row.usage);
    //output: 1
  });
});
