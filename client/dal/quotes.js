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

    var query = 'INSERT INTO QUOTES (title_id, quote)' +
        ' VALUES ($1, $2) RETURNING quote_id';
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

var get = (cm, quote_id) => {
    var client = cm.client;
    var defer = q.defer();
    var query = 'SELECT quote_id, title_id, quote from QUOTES'+
                ' where quote_id = $1';

    client.query(query,[quote_id] ,function(err, result) {
        
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
    var query = "DELETE FROM QUOTES WHERE quote_id = $1";
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
