var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DBIliskiler2");

// Post - Gonderi
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
module.exports = mongoose.model("Post", postSchema);