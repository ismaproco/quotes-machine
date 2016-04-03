var q = require('q');

var handleError = (err) => {
    if (err) {
        console.error(err);
        return err;
    } else {
        return false;
    }
};

var insert = (client, values) => {
    var defer = q.defer();
    var query = 'INSERT INTO KEYWORDS (keyword_id, keyword, usage)' +
        ' VALUES ($1, $2, $3)';
    if (client) {
        client.query(query, values, (err, result) => {
            if (handleError(err)) {
                defer.reject(err);
            }

            defer.resolve(result);
        });
    } else {
        defer.reject({ err: 'no client' });
    }

    return defer.promise;
};

var get = (cm, keyword) => {
    var client = cm.client;
    var defer = q.defer();
    var query = 'SELECT keyword_id, keyword, usage from KEYWORDS'+
                ' where keyword like $1 order by usage';

    //client.query('SELECT keyword_id, keyword, usage from KEYWORDS order by usage', function(err, result) {
    client.query(query,[keyword] ,function(err, result) {
        
        if (handleError(err)) {
          defer.reject(err);
        }

        defer.resolve(result.rows);
    });

    return defer.promise;
}



var dal = {
    insert: insert,
    get: get
};

module.exports = dal;
