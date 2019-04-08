var express = require("express");
var app = express();

app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home");
});

var server = app.listen(3000, function(){
    console.log("Port is : ", server.address().port);
})