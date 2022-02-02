const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=5a7cc3ade294b3e5c4ff14f9154816b5&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);
    // lolS
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp2 = weatherData.main.temp;
      const temp = weatherData.weather[0].description;
      console.log(temp2);
      const icon = weatherData.weather[0].icon;
      res.write("<h1>The temperture is " + temp2 + " degree celcius</h1>");
      res.write("<h1>The weather description is" + temp + "</h1></div>");
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imgurl + " >");
      res.send();
    });
  });
});

// const query ="London"  ;
// const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5a7cc3ade294b3e5c4ff14f9154816b5&units=metric";
// https.get(url,function(response){
//     console.log(response.statusCode);

//     response.on("data",function(data){
//         const weatherData= JSON.parse(data);
//         const temp2= weatherData.main.temp;
//         const temp=weatherData.weather[0].description;
//         console.log(temp2);
//         const icon=weatherData.weather[0].icon;
//         res.write("<h1>The temperture is "+ temp2+" degree celcius</h1>");
//         res.write("<h1>The weather description is"+ temp+ "</h1></div>");
//         const imgurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
//         res.write("<img src="+imgurl+" >");
//
// });
// });
app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
