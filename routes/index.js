'use strict';
var express = require('express');
var router = express.Router();
//var tweetBank = require('../tweetBank');
var client = require('../db');

module.exports = function makeRouterWithSockets(io) {

  function respondWithAllTweets(req, res, next) {
    client.query('SELECT tweets.id as tweetsID, * FROM tweets INNER JOIN users ON tweets.user_id=users.id', function (err, request) {
      if (err) return next(err); // pass errors to Express
      // console.log(tweets)
      var tweets = request.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  };

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  router.get('/users/:username', function (req, res, next) {
    client.query('SELECT tweets.id as tweetsID, * FROM tweets INNER JOIN users ON tweets.user_id=users.id WHERE users.name= $1', [req.params.username], function (err, request) {
      if (err) return next(err); // pass errors to Express
      var tweets = request.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  })

  router.get('/tweets/:id', function (req, res, next) {
    client.query(' SELECT tweets.id as tweetsID, * FROM tweets INNER JOIN users ON tweets.user_id=users.id WHERE tweets.id=' + req.params.id, function (err, request) {
      if (err) return next(err); // pass errors to Express
      var tweets = request.rows;
      // console.log("tweets", tweets);
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  })

  router.post('/tweets', function (req, res, next) {
    // var user_id;
    // client.query('SELECT * FROM users WHERE users.name=$1 ', [req.body.name], function (err, request) {
    //   if (err) return next(err);
    //   user_id = request.rows[0].id;
    // });
    
    // if (user_id) {
    //   console.log("USERID " + user_id);
    //   client.query('INSERT INTO tweets(user_id,content) VALUES ($1, $2)', [user_id, req.body.content], function (err, request) {
    //     if (err) return next(err);
    //     res.redirect('/');
    //   });
    // }
      console.log("USERID " + user_id);
      client.query('INSERT INTO tweets(user_id,content) VALUES ($1, $2)', [user_id, req.body.content], function (err, request) {
        if (err) return next(err);
        res.redirect('/');
      });
  });

  // // create a new tweet
  // router.post('/tweets', function (req, res, next) {
  //   var newTweet = tweetBank.add(req.body.name, req.body.text);
  //   io.sockets.emit('new_tweet', newTweet);
  //   res.redirect('/');
  // });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
