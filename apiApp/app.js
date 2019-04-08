var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});
 
app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://api.themoviedb.org/3/search/movie?api_key=69bf5b5e561afbb7db70e33718eb254c&query="+ query;

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        };
    });
});

var server = app.listen(3000, function(){
    console.log('Sunucu Portu : ', server.address().port);
});