// get walking directions from central park to the empire state building
var https = require("https");
var key = require("./config");
var utils = require("./utils");
var riotAPI= require("./riotAPI");

var testURL = utils.makeURL(riotAPI.getSummonerBySummonerName, "Pickle Sandwich", key.key);
console.log(testURL);
url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Pickle%20Sandwich?api_key=" + key.key;

// get is a simple wrapper for request()
// which sets the http method to GET
var request = https.get(testURL, function (response) {
// data is streamed in chunks from the server
// so we have to handle the "data" event    
var buffer = "", 
    data,
    route;

response.on("data", function (chunk) {
    buffer += chunk;
}); 

response.on("end", function (err) {
    // finished transferring data
    // dump the raw data
    console.log(buffer);
    console.log("\n ");
    data = JSON.parse(buffer);
    summonerName = data.name;

    // extract the distance and time
    console.log("Summoner name: " + summonerName);
    utils.testfunction();
}); 
}); 