const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

        res.sendFile(__dirname + "/index.html");

}) 


app.post("/", function(req, res){

    // console.log(req.body.cityName);
    // console.log("Post req recieved");


    const query = req.body.cityName;
    const apiKey = "441f51b7ab2af21acdedb507c0a6c578";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            // console.log(data);

            const weatherData = JSON.parse(data);
             
            const temp = weatherData.main.temp
            console.log(temp)
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription)
          //  res.send("<h1>The temperature in London is "+ temp + " degree Celcius.</h1>")
            
          const icon = weatherData.weather[0].icon
          const imgURL = " http://openweathermap.org/img/wn/"+ icon +"@2x.png"
          res.write("<h1>The temperature in "+ query +" is "+ temp + " degree Celcius.</h1>")
          res.write("<p>The weather is currently "+ weatherDescription + "</p>");
          res.write("<img src=" + imgURL +">")
          res.send();

            // console.log(weatherData);

            // const object = {
            //     name: "Pranjali",
            //     favFood: "Pizza"
            // }

            // console.log(JSON.stringify(object));


        })
    })
    
    // res.send("Server is up and running");  only one send permit
})






























  








app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})