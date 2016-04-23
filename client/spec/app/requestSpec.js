var config = require('../../config');
var rm = require('../../factories/managers/requestManager');

describe('Request Manager Tests', function(){
  var _url = 'http://en.wikiquote.org/w/api.php?action=query&list=search&srsearch=Ismael&utf8=&format=json&srlimit=100';
  var searchResults;

  it('- get JSON from url', ( done ) => {
    rm.getJSON( _url ).then((data) => {
      done();
      searchResults = data;
      expect( !searchResults ).toBe( false );
      expect( typeof(searchResults) ).toBe('object');
    });
  });

  it('- JSON contains query results', () => {
    expect(!searchResults.query).toBe( false );
    expect(!searchResults.query.search).toBe( false );
  });

});
