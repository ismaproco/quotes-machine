'use strict';

var config = require('./config');
var qm = require('./factories/db/queryHandler');

//set the config object of the queryHandler
qm.setConfig(config);

//get the query promise
var result = qm.execute('SELECT keyword_id, keyword, usage from KEYWORDS order by usage');

result
.then( function(result){
  console.log('then executed', result);
})
.fail( function(err){
  console.log('error', err);
});