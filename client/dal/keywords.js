var q = require('q');

var handleError = (err) => {
    if (err) {
        console.error(err);
        return err;
    } else {
        return false;
    }
};

var insert = (cm, values) => {
    var defer = q.defer();
    var client = cm.client;

    var query = 'INSERT INTO KEYWORDS (keyword, usage)' +
        ' VALUES ($1, $2) RETURNING keyword_id';
    if (client) {
        client.query(query, values, (err, result) => {
            if (handleError(err)) {
                defer.reject(err);
            }
            defer.resolve(result.rows);
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

    client.query(query,[keyword] ,function(err, result) {
        
        if (handleError(err)) {
          defer.reject(err);
        }

        defer.resolve(result.rows);
    });

    return defer.promise;
}


var remove = (cm, values) => {
    var client = cm.client;
    var defer = q.defer();
    var query = "DELETE FROM KEYWORDS WHERE KEYWORD LIKE $1";

    client.query(query, values ,function(err, result) {
        
        if (handleError(err)) {
          defer.reject(err);
        }
        
        defer.resolve(result.rowCount);
    });

    return defer.promise;
}


var dal = {
    insert: insert,
    get: get,
    remove: remove
};

module.exports = dal;
