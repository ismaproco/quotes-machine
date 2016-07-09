var kl = require('../../factories/loaders/keywordLoader');
var config = require('../../config');

describe('test the keywordLoader', () => {
    var path = config.keywordPath;

  it('get data from the Loader', ( done ) => {
    kl.load(path).then((data) => {

      expect( !!data ).toBe(true);
      done();
    },(err) => {
      console.log('err', err);
    }).fail((error) => {
      expect(error).toBeUndefined();
      done();
    });
  });

  it('the loader have more than 0 items', ( done ) => {
    kl.load(path).then((data) => {
      expect(  kl.count()  ).toBeGreaterThan(0);
      done();
    },(err) => {
      console.log('err', err);
    }).fail((error) => {
      expect(error).toBeUndefined();
      done();
    });
  });

  it('get next 10 entrances', ( done ) => {
    kl.getNext(10).then((result) => {
      expect( result.length ).not.toBeGreaterThan(10);  
      done();
    }).fail((error) => {
      expect("error").toBeUndefined();
      done();
    });
  });

  it('get all entrances', ( done ) => {
    kl.getAll(path).then((result) => {
      expect( result.length ).toBe(kl.count());  
      done();
    }).fail((error) => {
      expect("error").toBeUndefined();
      done();
    });
  });
});