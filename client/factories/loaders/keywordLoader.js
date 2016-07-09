// Author: Isma
// Description: Manage retrieval of data of the keywordLoader JSON by
// providing methods to load the content of the a keywords JSON file

// dependencies
var q = require('q');
var jh = require('../readers/JSONHandler');

var keywordsArray = [];
var pageSize = 10;
var currentPage = 0;

// load the keyword file into memory
var _load = (sourcePath) => {
    var defer = q.defer();

    if( sourcePath ){
        jh.getLocalJSON(sourcePath).then(function(data){
          keywordsArray = data;
          defer.resolve(data);
        });
    } else {
        defer.reject({message: 'Input file missing'});
    }
    
    return defer.promise;
}

var _getNext = () => {
    var defer = q.defer();
    //execute this function at the end of the current event cicle
    setTimeout( () => {
        var currentIndex = currentPage*pageSize;
        var result;
        if(currentIndex < keywordsArray.length) {
            result = keywordsArray.slice(currentIndex, currentIndex + 10);
        } else {
            result = [];
        }
        defer.resolve(result); 
    }, 10);

    return defer.promise;
}

var _getAll= () => {
    var defer = q.defer();
    //execute this function at the end of the current event cicle
    setTimeout( () => {
        defer.resolve(keywordsArray); 
    }, 10);

    return defer.promise;
}


var _count = () => {
    return keywordsArray.length;
}

module.exports = {
    load: _load,
    count: _count,
    getNext: _getNext,
    getAll: _getAll
}