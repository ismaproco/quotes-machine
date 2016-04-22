'use strict';
var request = require('request');
var q = require('q');

class requestManager {
    //return the promise with the data
    static getJSON(url) {
      var defer = q.defer();
      console.log('url', url);

      request(url, (error, response, body) => {
        if(!error && response.statusCode == 200 ) {
          defer.resolve(body);
        } else {
          defer.reject(error);
        }
      });

      return defer.promise;
    }
}

module.exports = requestManager;
