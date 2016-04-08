var keywordsDAL = require('../../dal/keywords');
var quotesDAL = require('../../dal/quotes');
var sourcesDAL = require('../../dal/sources');
var titlesDAL = require('../../dal/titles');

module.exports = {
    keywords: keywordsDAL,
    quotes: quotesDAL,
    sources: sourcesDAL,
    titles: titlesDAL
}