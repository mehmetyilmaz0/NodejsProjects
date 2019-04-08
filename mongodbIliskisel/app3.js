var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/DBIliskiler2");

var Post = require("./models/post");
var User = require("./models/user");

// user insert
User.create({
    email:"aa.merkez@gmail.com",
    name:"Adanaaali Adana"
})

// post insert
Post.create({
    title: "Post Basligi-3",
    content: " Post Content-3"
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
User.findOne({email:"aa.merkez@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
})

