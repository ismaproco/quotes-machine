var config = require('../config');
var qm = require('../factories/db/queryHandler');
var dm = require('../factories/db/dalManager');

describe('db sources test', function(){
  var _source_id;
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

  it('- sources insert ', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.sources.insert(cm, ['SOME SOURCE' ]).then( (result) => {
        
        _source_id = result[0].source_id;
        expect(result.length).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });

  it('- sources validation', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.sources.get(cm, 0).then( (result) => {
        expect(result.length).toBe(0);
      }).fail((err) => { handleFail(err,done) });

      dm.sources.get(cm, _source_id).then( (result) => {
        expect(result.length).toBeGreaterThan(0);
        done()
      }).fail((err) => { handleFail(err,done) });

    }).fail((err) => { handleFail(err,done) });
  });

  it('- sources delete ', (done) => {
    qm.getClient().then( ( cm ) => {
      dm.sources.remove(cm, [_source_id]).then( (result) => {
        expect(result).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });
});