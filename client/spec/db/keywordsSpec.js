var config = require('../../config');
var qm = require('../../factories/db/queryHandler');
var dm = require('../../factories/db/dalManager');

describe('db keywords test', function(){

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

  it('- keyword validation', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {

      dm.keywords.get(cm, 'XXXXX').then( (result) => {
        expect(result.length).toBe(0);
      }).fail((err) => { handleFail(err,done) });

      dm.keywords.get(cm, 'John Green (author)').then( (result) => {
        expect(result.length).toBeGreaterThan(0);
        done()
      }).fail((err) => { handleFail(err,done) });

    }).fail((err) => { handleFail(err,done) });
  });
  
  it('- keyword insert ', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.keywords.insert(cm, ['Gabriel Garcia Marquez', null ]).then( (result) => {
        expect(result.length).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });

  it('- keyword delete ', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.keywords.remove(cm, ['Gabriel Garcia Marquez']).then( (result) => {
        expect(result).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });
});