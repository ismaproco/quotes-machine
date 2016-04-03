// get the JSON from file system or external server
var fs = require('fs');
var q = require('q');

module.exports = new function(){
  var _self = this;

  _self.getLocalJSON = function(filePath){
    var deferred = q.defer();
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) throw err;
      deferred.resolve( JSON.parse(data) );
    });

    return deferred.promise;
  };

}