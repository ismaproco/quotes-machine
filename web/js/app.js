$(document).ready(function(){
  var keyword = getRandomKeyWord();
  getRandomQuotesByTerm(keyword);
});
var defaultTitles = [
  'John Green (author)',
  'Mark Twain',
  'The Matrix (film)',
  'Napoleon III',
  'Napoleon Hill',
  'George Washington',
  'Linus Torvalds',
  'John F Kennedy',
  'Julio Cortazar',
  'Mahatma Gandhi',
  'Martin Luther King, Jr.',
  'Star Wars',
  'Steve Jobs',
  'Nelson Mandela',
  'Elon Musk',
  'Barack Obama',
  'Gabriel Garcia Marquez',
  'Platon',
  'Albert Einstein',
  'Pablo Picasso'
]

function getRandomQuotesByTerm(term) {

    var searchTerm = term;
    // Get first search result and use as titles
    WikiquoteApi.openSearch(searchTerm,
      function(results) {
        console.log(results);

        var randomResult = getRandomElementFromList(results);
        // Get quote
          WikiquoteApi.getRandomQuote(randomResult,
            function(newQuote) {
              $('.quote-container').html('');
              var $quoteDiv = $('<div>');
              var text = $('<span>'+newQuote.quote+'</span>').text().replace(/↵/g,'').trim();
              console.log("msg ",text);

            if(!text || text.length <= 2) {
                  getRandomQuotesByTerm(term);
                }
              $quoteDiv.append($('<div class="quote-text">').html(text));
              $quoteDiv.append($('<div class="quote-from">').html(newQuote.titles));

            var tweetUrl = "http://twitter.com/share?text=" + text;
            var $anchor = $('<a>', { href:tweetUrl, target:'_blank'}).html('<i class="fa fa-twitter"></i>');

             $quoteDiv.append($anchor);


              $('.quote-container').append($quoteDiv);
            },
            function(msg){
              console.log("error ",msg);
            }
          );

      },
      function(msg) {
        alert(msg);
      }
    );
}


function openSearch(value) {

}

$('.new-quote').click(function(){
  var keyword = getRandomKeyWord();
  getRandomQuotesByTerm(keyword);
});

function getRandomKeyWord(){
  var title = getRandomElementFromList(defaultTitles);
  console.log(defaultTitles.length, title);
  return title;
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElementFromList(list) {
  var randomIndex = getRandomIntInclusive(0, list.length-1);
  return list[randomIndex];
}
