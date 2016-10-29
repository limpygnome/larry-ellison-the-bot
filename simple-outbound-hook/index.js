'use strict';

var qs = require("querystring");

// https://api.slack.com/events-api
exports.handler = function(event, context, callback) {

  var done = function(success, response) {
    callback(null, {
        statusCode: success ? '200' : '400',
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
        },
    });
  };

  var params = qs.parse(event.body);

  var username = params["user_name"];
  var channel_name = params["channel_name"];
  var text = params["text"];

  var matches = function(isMatchAll, words) {
    var word;
    var match;

    for (var i = 0; i < words.length; i++) {
      word = words[i];
      match = text.indexOf(word) != -1;

      if (isMatchAll && !match) {
        return false;
      } else if (!isMatchAll && match) {
        return true;
      }
    }
    return isMatchAll;
  };

  var matchesAll = function(words) {
    return matches(true, words);
  };

  var matchesSome = function(words) {
    return matches(false, words);
  };

  var pick = function(words) {
    var min = 0;
    var max = words.length - 1;
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return words[rand];
  };

  // add messagrs below...
  var message;

  if (matchesSome(["larry"]))
    message = pick([
      "yes? :troll:",
      "just a moment, acquiring a new piece of software..."
    ]);

  if (matchesAll(["quote", "larry"]))
    message = pick([
      "Life’s a journey. It’s a journey about discovering limits.",
      "Building Oracle is like doing math puzzles as a kid.",
      "I love sailing. I like it more when I am winning. :yacht:",
      "I was vehemently against acquisitions. Now let’s buy everything in sight. Well, that’s a slight exaggeration. We are a little more strategic than that. But everything was on sale.",
      "Being first is more important to me. I have so much money. Whatever money is, it’s just a method of keeping score now. I mean, I certainly don’t need more money.",
      "The most important aspect of my personality as far as determining my success goes; has been my questioning conventional wisdom, doubting experts and questioning authority. While that can be painful in your relationships with your parents and teachers, it’s enormously useful in life.",
      "When you innovate, you’ve got to be prepared for people telling you that you are nuts. :troll:",
      "A corporation’s primary goal is to make money. Government’s primary role is to take a big chunk of that money and give to others. :yacht:",
      "Bill Gates wants people to think he is Edison, when he’s really Rockefeller. Referring to Gates as the smartest man in America isn’t right. Wealth isn’t the same thing as intelligence. :fire:",
      "Everyone thought the acquisition strategy was extremely risky because no one had ever done it successfully. In other words, it was innovative. :troll:",
      "It’s my job for Oracle, the number two software company in the world; to become the number one software company in the world. My job is to build better than the competition, sell those products in the marketplace and eventually supplant Microsoft and move from being number two to number one.",
      "When you live your life in different ways, it makes people around you become uncomfortable. So deal with it. They don’t know what you are going to do.",
      "I think I am very goal oriented. I’d like to win the America’s cup. I’d like Oracle to be the No 1 software company in the world. I still think it is possible to beat Microsoft.",
      "I think you might see us growing much deeper into banking. You might see us acquiring companies in the banking area. You might see us acquiring companies in the retail area. I think you might see us acquiring companies in the telecommunications. I think you will see us getting stronger in business intelligence.",
      "I have run engineering since day one at Oracle, and I still run engineering. I hold meetings every week with the database team, the middle ware team, the applications team. I run engineering and I will do that until the board throws me out of there.",
      "“I think about the business all the time. Well I shouldn’t say all the time. I don’t think about it when I am wakeboarding. But even when I am on vacation, or on my boat; I am on email everyday. I am always prowling around the internet looking at what our competitors are doing. :yacht:",
      "You have to believe in what you do in order to get what you want.",
      "Because software is all about scale. The larger you are, the more profitable you are. If we sell twice as much as software, it doesn’t cost us twice as much to build that software. So the more customers you have, the more scale you have. The larger you are, the more profitable you are."
    ]);

  if (matchesAll(["weblogic", "bouncing"]) || matchesAll(["bouncing", "prod"]) || matchesAll(["bouncing", "sand"]))
    message = pick([
      ":fire: I'm the trouble starter, punking instigator. :fire:",
      "...hey guys, what should I call my next island? :yacht:",
      "...what is virtualisation? money. $$$ :troll:"
    ]);

  if (matchesAll(["hate", "larry"]))
    message = pick([
      "well i dont love you either :troll:",
      "hurt? :troll:",
      "can you at least give me a name for my island? :troll:"
    ]);

  var payload = { };

  if (message) payload.text = message;

  done(true, payload);

};
