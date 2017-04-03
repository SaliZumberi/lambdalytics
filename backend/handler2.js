'use strict';

var express = require('express')
var app = express()
var twitter = require('ntwitter');

  // app.get('/', (req, res) => {
  //       var response = "<HEAD>" +
  //         "<title>Twitter Sentiment Analysis</title>\n" +
  //         "</HEAD>\n" +
  //         "<BODY>\n" +
  //         "<P>\n" +
  //         "Welcome to the Twitter Sentiment Analysis app.  " +   
  //         "What phrase would you like to analzye?\n" +                
  //         "</P>\n" +
  //         "<FORM action=\"/testSentiment\" method=\"get\">\n" +
  //         "<P>\n" +
  //         "Enter a phrase to evaluate: <INPUT type=\"text\" name=\"phrase\"><BR>\n" +
  //         "<INPUT type=\"submit\" value=\"Send\">\n" +
  //         "</P>\n" +
  //         "</FORM>\n" +
  //         "</BODY>";
  //       var phrase = req.query.phrase;
  //       if (!phrase) {
  //           res.send(response);
  //       } else {
  //           sentiment(phrase, function (err, result) {
  //               response = 'sentiment(' + phrase + ') === ' + result.score;
  //               res.send(response);
  //           });
  //       }
  //   });

  // Sample keys for demo and article - you must get your own keys 
//   if you clone this application!
// Create your own app at: https://dev.twitter.com/apps
var tweeter = new twitter({
    consumer_key: '2vExKpL7bwRqIUo8CPpnDZZqh',
    consumer_secret: 'YJ3Ya9ZV21jrEcx3BuKTkJvZzU09ojTeZNJoBZ2B8wbeMdFjba',
    access_token_key: '846732875902976002-HPvAujFsByDF281MxLRqdKaRCqgtQOq',
    access_token_secret: 'pt9YIghOzZ9OqC1SPcSt2oLlUjBFMw9miPP18ptWW2KRo'
});
 
// app.get('/', (req, res) => {
//     tweeter.verifyCredentials((error, data) => {
//         res.send("Hello, " + data.name + ".  I am in your twitters.");
//     });
// });

app.get('/', (req, res) => {
    var stream;
    var testTweetCount = 0;
    var phrase = 'bieber';
    tweeter.verifyCredentials((error, data) => {
        if (error) {
            res.send("Error connecting to Twitter: " + error);
        }
        stream = tweeter.stream('statuses/filter', {
            'track': phrase
        }, (stream) => {
            res.send("Monitoring Twitter for \'" + phrase 
                + "\'...  Logging Twitter traffic.");
            stream.on('data', (data) => {
                testTweetCount++;
                // Update the console every 50 analyzed tweets
                if (testTweetCount % 50 === 0) {
                    console.log("Tweet #" + testTweetCount + ":  " + data.text);
                }
            });
        });
    });
});

exports.app = require('express-on-serverless')(app)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });