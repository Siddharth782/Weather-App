const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");   
});

app.post("/", function(req,res){

const city = req.body.cityname;
const appid = "3129273e4089d774fbb15574391257b2";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + unit;

https.get(url, function (response) {
    console.log(response.statusCode);
    response.on('data', function (data) {  
        const weatherData = JSON.parse(data);

        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const img1 = weatherData.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + img1 + "@2x.png";
        console.log(desc);
        console.log(temp);

        res.write("<h1>The temp of "+city +" is :" + temp + " degree celcius.</h1> ");
        res.write("<p>The weather is currently " + desc + "like</p>");
        res.write("<img src= " + imgurl + " >");

    })
})
})

app.listen(3000, function () {
    console.log("its working");
})