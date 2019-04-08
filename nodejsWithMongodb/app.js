var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/User");

var userSchema = new mongoose.Schema({
    name : String,
    lastName : String,
    country : String,
    age : Number
});

var User = mongoose.model("User", userSchema);

// CREATE 1 (INSERT)
/* 
var degisken = new User({
    name: "Mehmet",
    lastName: "Yılmaz",
    country: "Turkey",
    age: 29
});

degisken.save(function(err, userDB){
    if(err){
        console.log("Birseyler Yanlis Gitti");
    } else {
        console.log("Yeni Bir Kullanici Eklendi..");
        console.log(userDB);
    }
});
 */

 // CREATE 2 (INSERT)
 User.create({
     name:"Osman",
     lastName:"Yilmaz",
     country:"Turkey",
     age:14
 }, function(err, userDB){
    if(err){
        console.log("Birseyler Yanlis Gitti");
    } else {
        console.log("Yeni Bir Kullanici Eklendi..");
        console.log(userDB);
    }
 });

 // FIND (SELECT)
 User.find({}, function(err, users){
     if(err){
        console.log("Birseyler Yanlis Gitti");
        console.log(err);
     } else {
        console.log("*********KULLANICILAR*********");
        console.log(users);
     }
 })