var config = require('../config');
var qm = require('../factories/db/queryHandler');
var jm = require('../factories/readers/JSONHandler');
var dm = require('../factories/db/dalManager');

describe('db test', function(){

  var handleFail = (err, done) => {
    console.error('FAIL',err);
    expect(err).toBeUndefined();
    if(done) {
      done();  
    }
  };

  afterEach(() => {
    //release clients that remain open
    qm.releaseClients();  
  });

  it('is config connection string defined?', (done) => {
    expect(config.dbConnection).toBeDefined();
    done();
  });

  it('is client connecting?', (done) => {
    qm.setConfig(config);
    
    qm.getClient().then( (data) => {
      expect(data).toBeDefined();
      done();
    }).fail((err) => { handleFail(err,done) });
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
});