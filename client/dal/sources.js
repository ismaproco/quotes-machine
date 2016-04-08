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

    var query = 'INSERT INTO SOURCES (source_name)' +
        ' VALUES ($1) RETURNING source_id';
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

var get = (cm, source_id) => {
    var client = cm.client;
    var defer = q.defer();
    var query = 'SELECT source_id, source_name from SOURCES'+
                ' where source_id like $1';

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
    var query = "DELETE FROM SOURCES WHERE source_name LIKE $1";

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
