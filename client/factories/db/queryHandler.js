'use strict';

var pg = require('pg');
var q = require('q');
var config;
var clients = [];

var getClient = function getClient() {
  var conString = config.dbConnection;

    var deferred = q.defer();
    //this initializes a connection pool
    //it will keep idle connections open for a (configurable) 30 seconds
    //and set a limit of 20 (also configurable)
    pg.connect(conString, function(err, client, done) {
        var clientManager = { client: client, done: done };

        //error getting client from the pool
        if (err) {
          done();
          deferred.reject(err);
        }

        clients.push( clientManager );
        deferred.resolve( clientManager );

    });

    return deferred.promise;
};

var releaseClients = () => {
  for( var i = 0; i < clients.length; i++ ) {
    if(clients[i]) {
      if(clients[i].done) {
        clients[i].done();  
      }
      
      if(clients[i].end) {
        clients[i].end();  
      }
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
