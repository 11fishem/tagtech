var db = require('../db/dbConfig');
var Player = require('../db/players');
var sessionHandler = require('./session-handler');
var util = require('./util');
// var request = require('request');

exports.createUser = function(req, res) {
  var user = req.body;

  var newPlayer = {
    uid :  user.uid,
    location : {
      lat : user.lat,
      long : user.long
    },
    monster: user.monster,
    distance : user.distance,
    hold : user.hold,
    dt_call_home: user.dt_call_home
  }

  new Player(newPlayer).save(function(err, player) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATED new User', player)
        res.send('Created new user')
      }
  });

};

exports.getUsers = function(req, res) {
  Player.find({}, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  });
};

exports.userCheckin = function(req, res) {
  if (req.method == "PUT"){
    console.log("HERE");
    var uid = req.body.uid;
    Player.findOneAndUpdate({uid:uid},{dt_call_home:Date.now()},{upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
    });
  }
};

exports.updateLocation = function(req, res) {
  if (req.method == "PUT"){
    var uid = req.body.uid;
    var lat = req.body.lat;
    var long = req.body.long;
    Player.findOneAndUpdate({uid:uid},{"location.lat":lat, "location.long":long},{upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
    });
  }
};

exports.addMonster = function(req, res) {
  if (req.method == "PUT"){
    var uid = req.body.uid;
    Player.findOneAndUpdate({uid:uid},{monster:true, hold: Date.now()},{upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
    });
  }
};

exports.dropMonster = function(req, res) {
  if (req.method == "PUT"){
    var uid = req.body.uid;
    Player.findOneAndUpdate({uid:uid},{monster:false},{upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
    });
  }
};

exports.dropHold = function(req, res) {
  if (req.method == "PUT"){
    var uid = req.body.uid;
    Player.findOneAndUpdate({uid:uid},{hold:null},{upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
    });
  }
};

// exports.get12346 = function(req, res) {
//   console.log('GET 12346')
//   Player.find({uid:"12346"}, function(err, results) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('RESULTS IS ', results)
//       res.send(results)
//     }
//   });
// };
