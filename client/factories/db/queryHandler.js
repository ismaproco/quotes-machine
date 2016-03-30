'use strict';

var pg = require('pg');
var q = require('q');
var config;

var executeQuery = function executeQuery(query) {

  console.log('connection', config.dbConnection);
  var conString = config.dbConnection;

    var deferred = q.defer();
    //this initializes a connection pool
    //it will keep idle connections open for a (configurable) 30 seconds
    //and set a limit of 20 (also configurable)
    pg.connect(conString, function(err, client, done) {
        //error getting client from the pool
        if (err) {
          done();
          deferred.reject(err);
          return console.error('error fetching client from pool', err);
        }
        //client.query('SELECT keyword_id, keyword, usage from KEYWORDS order by usage', function(err, result) {
        client.query( query, function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            //error executing query
            if (err) {
              deferred.reject(err);
              return console.error('error running query', err);
            }

            deferred.resolve(result);
        });
    });

    return deferred.promise;
};

var queryManager = {
  setConfig: function( _config ){
    config = _config;
  },
  execute: executeQuery
}

module.exports = queryManager;
