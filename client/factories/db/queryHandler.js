'use strict';

var pg = require('pg');
var q = require('q');
var config;
var clients = [];

var getClient = function getClient() {
  console.log('connection', config.dbConnection);
  var conString = config.dbConnection;

    var deferred = q.defer();
    //this initializes a connection pool
    //it will keep idle connections open for a (configurable) 30 seconds
    //and set a limit of 20 (also configurable)
    pg.connect(conString, function(err, client, done) {
        var clientManager = { client: client, done: done() };

        //error getting client from the pool
        if (err) {
          done();
          deferred.reject(err);
        }

        clients.push( clientManager );

        deferred.resolve( clientManager );
        /*
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
        */
    });

    return deferred.promise;
};

var releaseClients = () => {
  for( var i = 0; i < clients.length; i++ ) {
    if(clients[i]) {
      clients[i].done();
    }
  }
};

var queryManager = {
  setConfig: function( _config ){
    config = _config;
  },
  getClient: getClient,
  releaseClients: releaseClients
}

module.exports = queryManager;
