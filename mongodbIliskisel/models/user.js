var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DBIliskiler2");

// User - Kullanici
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
module.exports = mongoose.model("User", userSchema);