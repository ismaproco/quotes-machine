var config = require('../../config');
var qm = require('../../factories/db/queryHandler');
var jm = require('../../factories/readers/JSONHandler');

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

});