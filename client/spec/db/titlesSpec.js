var config = require('../../config');
var qm = require('../../factories/db/queryHandler');
var dm = require('../../factories/db/dalManager');

describe('db titles test', function(){
  var _title_id;
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

  it('- titles insert ', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.titles.insert(cm, ['SOME TITLE', 1 ]).then( (result) => {
        _title_id = result[0].title_id;
        expect(result.length).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });

  it('- titles validation', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {
      dm.titles.get(cm, 0).then( (result) => {
        expect(result.length).toBe(0);
      }).fail((err) => { handleFail(err,done) });
      
      dm.titles.get(cm, _title_id).then( (result) => {
        expect(result.length).toBeGreaterThan(0);
        done()
      }).fail((err) => { handleFail(err,done) });

    }).fail((err) => { handleFail(err,done) });
  });

  it('- titles delete ', (done) => {
    qm.getClient().then( ( cm ) => {
      dm.titles.remove(cm, [_title_id]).then( (result) => {
        expect(result).toBeGreaterThan(0);
        done();
      }).fail((err) => { handleFail(err,done) });
    }).fail((err) => { handleFail(err,done) });
  });
});