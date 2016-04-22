'use strict';

var config = require('./config');
var qm = require('./factories/db/queryHandler');
var jm = require('./factories/readers/JSONHandler');
var sm = require('./factories/managers/ServiceManager');

//set the config object of the queryHandler
qm.setConfig(config);

var myF = () => {
    console.log('this is some func');
};

var m = sm.create(config.serviceInterval, [{run:myF},{run:myF},{run:myF},{run:myF},{run:myF}]);
m.start();
setTimeout(()=> {m.stop()},20100);
//get the query promise
/*var result = qm.execute('SELECT keyword_id, keyword, usage from KEYWORDS order by usage');

result
.then( function(result){
  console.log('then executed', result);
})
.fail( function(err){
  console.log('error', err);
});

jm.getLocalJSON('data/keywords.json').then(function(data){
  console.log('the basket was open', data);
});
*/

// keep the service running *
// execute load operation
// query the wiki for new titles
// save the titles
// close connection
// wait for the next execution