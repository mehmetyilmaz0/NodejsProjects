
var express = require("express");
var app = express();

// public klasorunun altindaki css dosyasını gormesi icin..
app.use(express.static("public"));

// her defasinda home.ejs, test.ejs diyecegimize bu sekilde tanimlayip
// artik home ve test diyebiliriz render ladigimiz sayfalari
app.set("view engine", "ejs");

// http://localhost:3000
app.get("/", function(req, res){
    // res.send("Merhabalar Bu Bir Responsedir..");
    res.render("home");
});

// http://localhost:3000/test
app.get("/test", function(req, res){
    res.send("Bu Bir Test Denemesidir..");
});

app.get("/test/:bisey", function(req, res){
    var testParameter = req.params.bisey;
    res.render("test", {testParameter}); 
});

// tanimladigimiz bir istek gelmez ise asagidaki responsu don...
app.get("*", function(req, res){
    res.send("Sayfa Bulunamadi.....");
});

// simdi birtane server olusturalim. cunku uygulamamizi canli canli test edebilelim..
var server = app.listen(3000, function(){
    console.log("Server Suanda Port Numarasinda : %d", server.address().port);
});