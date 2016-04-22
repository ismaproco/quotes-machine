var config = require('../../config');
var rm = require('../../factories/managers/requestManager');

describe('Request Manager Tests', function(){
  var _url = 'http://en.wikiquote.org/w/api.php?action=query&list=search&srsearch=Ismael&utf8=&format=json&srlimit=100';

  it('- get JSON from url', ( done ) => {
    rm.getJSON( _url ).then((data) => {
      console.log('service exec', data, done);
      done();
      expect(data).toNotBeUndefined();
    });
  });

});
