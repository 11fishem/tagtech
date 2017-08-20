var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoURI = 'mongodb://localhost:27017/players';
mongoose.connect(mongoURI);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection err'));

db.once('open', function() {
  console.log('Mongodb connection is open');
});
