/*
    Created by: Wesley Springer
    MIT License
    Gathers 100 matches in Platinum using my summoner name as a seed.
*/

// Requiring files
var key     = require("./config");
var utils   = require("./utils");
var riotAPI = require("./riotAPI");

// Globals
var matches           = [];
var accountId         = "";
var matchId           = "";
var matchParticipants = [];

// Initial seed
var URL = utils.makeURL(riotAPI.getSummonerBySummonerName, "Pickle Sandwich", key.key);

// Using async calls and promises to keep things orderly + starting promise chain
// gets accountId from my Lague summoner name
var promises = utils.makeRequest(URL).then(function(response) {
  console.log("Success: ", response.accountId);
  accountId = response.accountId;
  matchParticipants.push(accountId);
}, function(error) {
  console.error("Error: ", error);
}).then(function() {

  //retrieves matchid from most recent ranked game
  URL = utils.makeRankedMatchlistURL(riotAPI.getMatchListByAccount, accountId, "4", key.key);
  return utils.makeRequest(URL).then(function(response) {
    matches.push(response[0]);
    matchId = response.matches[0].gameId;
    console.log(matchId);
  }).then(function() { 

    //gets match info from match id
    URL = utils.makeURL(riotAPI.getMatchByMatchID, matchId, key.key);
    return utils.makeRequest(URL).then(function(response) {
      //gets accountIds of all participants haven't seen before and puts them in array
      matchParticipants.push.apply(matchParticipants, utils.getMatchParticipants(response, matchParticipants));
    })

  }).then(function() {
    
  })
})

Promise.all([promises])
  .then(function() { console.log("after Request") })
  .catch(console.error);


/*
Algorithm plan:

1. Begin with a seed (my account) and get the accountId 35568776 from it
2. Get most recent match using matchlist API https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/35568776?queue=4
3. Using gameId, get match info from getmatch API https://na1.api.riotgames.com/lol/match/v3/matches/2078564264
4. Store resulting JSON object in array (or database?)
loop:
5. Get all summonerIds from match info and check against https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/ to check if they're platinum rank
6. If summoner is plat, get most recent ranked game and store object in array or database
8. If gameId already exists in array, do not add
7. Once 100 matches are reached, end loop
endloop

8. Loop through resulting array
9. For each item in array, go through JSON object and get champion IDs, find out who champion is, and check if they're a tank. Do this only for the first 5 players
10. Check for if team did not have a tank.
11. If team did not have a tank, record the result of win or loss.
12. Display percentage of wins.
*/