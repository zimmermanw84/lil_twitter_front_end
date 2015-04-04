var handleLandingPageTweets = (function() {

  "use strict";

  var html;
  var tweetId;

  var renderAllTweets = function(tweets) {
    html = $('#tweets-template').html();
    var tweetsTemplate = Handlebars.compile(html);
    $('.tweet-container').prepend(tweetsTemplate({ tweets: tweets }));
  };

  var getTweets = function(callback) {
    $.get('http://localhost:3000/tweets')
      .success( function(tweets) {
        callback(tweets);
    })
      .error(function() {
      throw 'No Data Recieved: Get Tweets';
    });
  };

  var clearForm = function() {
    $('#user_handle').val('');
    $('#content').val('');
  };

  var renderNewTweet = function(tweet) {
    html = $('#tweet-template').html();
    var tweetTemplate = Handlebars.compile(html);
    $(".list-group").prepend(tweetTemplate({ tweet: tweet }));
  };

  var createNewTweet = function(callback) {
    var promise = $.post('http://localhost:3000/tweets', $('.tweet-form').serialize());

    promise.success(function(tweet) {
      callback(tweet);
    });

    promise.error(function() {
      throw 'No Data Saved: Create New Tweet';
    })
  };

  var bindTweetEvent = function() {
    $('.tweet-form').on('submit', function(event) {
      event.preventDefault();
      createNewTweet(renderNewTweet);
      clearForm();
    })
  };

  var renderSearchPage = function() {
    $('.render-search').on('click', function(event) {
      $('.main-page').css('display', 'none');
      $('.search-page').css('display', 'block');
    })
  };

  var init = function() {
    getTweets(renderAllTweets);
    bindTweetEvent();
    renderSearchPage();
  };

  return {
    init: init,
  };

})();

// ----------------------------------------------- //

var searchPageModule = (function() {

  "use strict";

  var html;

  var findTweets = function(callback) {
    $.get('http://localhost:3000/tweets/search', $('.search-tweet').serialize())
      .success( function(tweets) {
        callback(tweets);
      })
      .error(function() {
        throw 'No Data Recieved: Find Tweets'
      })
  };

  var renderFoundTweets = function(tweets) {
    html = $('#tweets-template').html();
    var tweetsTemplate = Handlebars.compile(html);
    if (tweets.length < 1) {
      $('.tweet-search-container').prepend('<h1>Sorry... No Tweets Found</h1>');
      $('#search-field').css('border', '3px solid red');
    } else {
      $('.tweet-search-container').prepend(tweetsTemplate({ tweets: tweets }));
      $('#search-field').val(''); // Clear Search Field
    }
  };

  var bindSearchEvent = function() {
    $('.search-tweet').on('submit', function(event) {
      event.preventDefault();
      $('.tweet-search-container').html(''); // Clear Tweet Search Container
      findTweets(renderFoundTweets);
      $('#search-field').css('border', '1px solid black'); // Clear Red Border if true
    });
  };

  var renderMainPage = function() {
    $('.render-main').on('click', function(event) {
      $('.search-page').css('display', 'none');
      $('.main-page').css('display', 'block');
    })
  };

  var init = function() {
    bindSearchEvent();
    renderMainPage();
  };

  return {
    init: init,
  };

})();

searchPageModule.init();
handleLandingPageTweets.init();
