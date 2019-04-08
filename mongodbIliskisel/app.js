var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DBIliskiler");

// Post - Gonderi
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// User - Kullanici
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
});
var User = mongoose.model("User", userSchema);

// new user
var newUser = new User({
    email: "ezgi.yilmaz2@outlook.com.tr",
    name: "Ezgi Yılmaz"
});

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});

var newPost = new Post({
    title: "KakaJS",
    content: "KakaJS Ogrenmek Hic Zor Degilmis.."
});

newPost.save(function(err, post){
    if(err){
        console.log(err);
    } else {
        console.log(post);
    }
}); 

newUser.posts.push({
    newPost
});