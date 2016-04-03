var config = require('../config');
var qm = require('../factories/db/queryHandler');
var jm = require('../factories/readers/JSONHandler');
var dm = require('../factories/db/dalManager');

describe('db test', function(){

  it('is config connection string defined?', (done) => {
    expect(config.dbConnection).toBeDefined();
    done();
  });

  it('is client connecting?', (done) => {
    qm.setConfig(config);
    
    qm.getClient().then( (data) => {
      expect(data).toBeDefined();
      done();
    }).fail((err) => {
      console.error('error...', err);
      done();
    });
  });

  it('- keyword validation', (done) => {
    // cm = clientManager
    qm.getClient().then( ( cm ) => {

      dm.keywords.get(cm, 'XXXXX').then( (result) => {
        expect(result.length).toBe(0);
      }).fail(() => {
        expect(false).toBe(true);
      });

      dm.keywords.get(cm, 'John Green (author)').then( (result) => {
        expect(result.length).toBeGreaterThan(0);
        done()
      }).fail(() => {
        expect(false).toBe(true);
        done();
      });

    }).fail(()=> {
      console.error('FAIL');
    });
  });


  //release clients that remain open
  qm.releaseClients();

});