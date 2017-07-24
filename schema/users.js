var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Users = new Schema({
    login    : String,
    email    : String,
    password : String
});

module.exports = mongoose.model('Users', Users);