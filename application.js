var handleLandingPageTweets = (function() {

  "use strict";

  var html;
  var tweetId;

  var renderAllTweets = function(tweets) {
    html = $('#tweets-template').html();
    var tweetsTemplate = Handlebars.compile(html);
    $('.tweet-container').prepend(tweetsTemplate({ tweets: tweets }))
  };

  var getTweets = function(callback) {
    $.get('http://localhost:3000/tweets').success( function(tweets) {
      callback(tweets);
    });
  };

  var clearForm = function() {
    $('#user_handle').val('');
    $('#content').val('');
  };

  var renderNewTweet = function(tweet) {
    html = $('#tweet-template').html();
    var tweetTemplate = Handlebars.compile(html);
    $(".list-group").prepend(tweetTemplate({ tweet: tweet }))
  };

  var createNewTweet = function(callback) {
    var promise = $.post('http://localhost:3000/tweets', $('.tweet-form').serialize());

    promise.success(function(tweet) {
      callback(tweet);
    });

    promise.error(function() {
      console.log('NO SOUP FOR YOU')
    })

  };

  var bindTweetEvent = function() {
    $('.tweet-form').on('submit', function(event) {
      event.preventDefault();
      createNewTweet(renderNewTweet);
      clearForm();
    })
  };

  var init = function() {
    getTweets(renderAllTweets);
    bindTweetEvent();
  };

  return {
    init: init,
  };

})();

handleLandingPageTweets.init();
