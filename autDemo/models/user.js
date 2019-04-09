var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password : String
});

userSchema.plugin(passportLocalMongoose); // passport-local-mongoose 'de bulunan metodlari userSchema ya import ettim
module.exports = mongoose.model("User", userSchema);