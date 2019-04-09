var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passport                = require("passport"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session");
    
mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.use(expressSession({
    secret : "Bu Bir Session Express Uygulamasidir..",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize()); // passwordu initalize ediyoruz..
app.use(passport.session());    // passworddan session metodunu cagir

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("home");
});

app.get("/gizli", function(req, res){
    res.render("gizli");
});


//==========================================================================//
var server = app.listen(3000, function(){
    console.log("Sunucu Portu : ", server.address().port);
});