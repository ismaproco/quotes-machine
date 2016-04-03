var config = require('../config');
var qm = require('../factories/db/queryHandler');
var jm = require('../factories/readers/JSONHandler');

describe('db test', function(){

  it('is config connection string defined?', (done) => {
    expect(config.dbConnection).toBeDefined();
    done();
  });

  it('is client connecting?', (done) => {
    qm.setConfig(config);
    
    qm.getClient().then((data) => {
      expect(data).toBeDefined();
      done();
    }).fail((err) => {
      console.error('error...', err);
      done();
    });
  });

  //release clients that remain open
  qm.releaseClients();

});