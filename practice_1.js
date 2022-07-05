const express = require("express");
const https = require("https");

const app = express();


app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=3129273e4089d774fbb15574391257b2&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on('data', function (data) {  // the "data" here is the data that we got as response & it is passed to function as data.
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const img1 = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + img1+ "@2x.png";
            console.log(desc);
            console.log(temp);
            // res.send("<h1>The temp is :" + temp + " degree celcius.</h1> <br>" +"<h1>The weather is currently "+ desc+"like</h1>");
           //or
           
           res.write("<h1>The temp in " + city + " is : " + temp + " degree celcius.</h1> ");
           res.write("<p>The weather is currently "+ desc+" like</p>");
           res.write("<img src= " + imgurl+ " >");
            
            // const obect = {
            //     name: "Sidd",
            //     favFood: "Ramen"
            // }
            // console.log(JSON.stringify(obect));
            // this is to show how we can collapse the data.
        })
    })
    // res.send("Server is up and running") 
    // we can only send 1 res.send. so it will give error if we send 2. 
})


app.listen(5000, function () {
    console.log("its working");
})