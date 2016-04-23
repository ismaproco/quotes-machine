'use strict';
var request = require('request');
var q = require('q');

class requestManager {
    //return the promise with the data
    static getJSON(url) {
      var defer = q.defer();
      let result;
      console.log('url', url);

      request(url, (error, response, body) => {
        if(!error && response.statusCode == 200 ) {
          result = JSON.parse( body );
          defer.resolve(result);
        } else {
          defer.reject(error);
        }
      });

      return defer.promise;
    }
}


//http://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = requestManager;
