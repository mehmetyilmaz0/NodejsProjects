var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passport = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session");

mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(expressSession({
    secret: "Bu Bir Session Express Uygulamasidir..",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // passwordu initalize ediyoruz..
app.use(passport.session());    // passworddan session metodunu cagir

passport.use(new LocalStrategy(User.authenticate())); // giris yapma istegi satirindaki authenticate'nin calismasini sagliyor.. 
passport.serializeUser(User.serializeUser()); // password'u encode et..
passport.deserializeUser(User.deserializeUser()); // password'u decode et..

// Routes

app.get("/", function (req, res) {
    res.render("home");
});

//==========================================================================//

// KAYDOL Routes
app.get("/kaydol", function(req, res){
    res.render("kaydol");
});

// kayit istegi gonder..
app.post("/kaydol", function(req, res){
    User.register(new User({username : req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("home");
        } else {
            passport.authenticate("local")(req, res, function(){ // local : bu bir strateji.. yani passport-local'deki local
                res.redirect("/gizli"); // gizli sayfasina yonlendir..
            });
        }
    });
});

//==========================================================================//

// GIRIS Routes
app.get("/giris", function(req, res){
    res.render("giris");
});

// Giris Yapma İsteği Gonder
app.post("/giris", passport.authenticate("local", {
    successRedirect: "/gizli",
    failureRedirect: "/giris"
}), function(req, res){
    
});

//==========================================================================//

// CIKIS Routes
app.get("/cikis", function(req, res){
    req.logout();
    res.redirect("/");
});

//==========================================================================//

function isLogggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/giris");
    }
}

// GIZLI Route
app.get("/gizli", isLogggedIn ,function (req, res) {
    res.render("gizli");
});

//==========================================================================//
var server = app.listen(3000, function () {
    console.log("Sunucu Portu : ", server.address().port);
});