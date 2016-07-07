var kl = require('../../factories/loaders/keywordLoader');


describe('test the keywordLoader', () => {

    it('get total of entrances', ( done ) => {
      kl.load().then(() => {
        done();
        expect( !isNaN( kl.count() ) ).toBe(true);  
      });
    });

    it('get next 10 entrances', ( done ) => {
      kl.getNext(10).then((result) => {
        done();
        expect( result.length ).toBeLowerOrEqualThan(10);  
      });
    });

    it('get all entrances', ( done ) => {
      kl.getAll().then((result) => {
        done();
        expect( result.length ).toBe(kl.count());  
      });
    });

});