
var express = require("express");
var app = express();
var bodyParser = require("body-parser"); // post metodlarinda kullaniyoruz..

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var sehirler = ["Londra", "Ankara", "Frankfurt", "Selanik"];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/sehirler", function(req, res){
    res.render("sehirler", {sehirler: sehirler});
});

app.post("/sehirEkle", function(req, res){
    var yeniSehir = req.body.yeniSehir;
    if(yeniSehir != "")
        sehirler.push(yeniSehir);
    res.render("sehirler", {sehirler: sehirler});
});

var server = app.listen(3000, function(){
    console.log("Server Port Number : %d", server.address().port);
});