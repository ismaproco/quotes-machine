var config = require('../config');
var qm = require('../factories/db/queryHandler');
var dm = require('../factories/db/dalManager');

describe('db quotes test', function(){
  var _quote_id;
  var handleFail = (err, done) => {
    console.error('FAIL',err);
    expect(err).toBeUndefined();
    if(done) {
      done();  
    }
  };

  qm.setConfig(config);
  
  afterEach(() => {
    //release clients that remain open
    qm.releaseClients();  
  });

  it('- quotes insert ', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.quotes.insert(cm, [null , 'TEST_QUOTE' ]).then( (result) => {
        
        _quote_id = result[0].quote_id;
        expect(result.length).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });

  it('- quotes validation', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {

      dm.quotes.get(cm, 0).then( (result) => {
        expect(result.length).toBe(0);
      }).fail((err) => { handleFail(err,done) });

      dm.quotes.get(cm, _quote_id).then( (result) => {
        expect(result.length).toBeGreaterThan(0);
        done()
      }).fail((err) => { handleFail(err,done) });

    }).fail((err) => { handleFail(err,done) });
  });
    

  it('- quotes delete ', (done) => {
    qm.getClient().then( ( cm ) => {
      dm.quotes.remove(cm, [_quote_id]).then( (result) => {
        expect(result).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });
});