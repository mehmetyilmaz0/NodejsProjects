var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DBIliskiler2");

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
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
var User = mongoose.model("User", userSchema);

// user insert
User.create({
    email:"adana.merkez@gmail.com",
    name:"Adanali Adana"
})

// post insert
Post.create({
    title: "Post Basligi-2",
    content: " Post Content-2"
}, function(err, post){
    User.findOne({email:"adana.merkez@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    })
});

// select user 
User.findOne({email:"adana.merkez@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
})

