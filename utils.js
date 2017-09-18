'use strict';

var https   = require('https'),
    riotAPI = require('./riotAPI'),
    key     = require('./config'),

testfunction = function() {
  console.log("test");
},

makeURL = function(requestType, requestingId, key) {
  return "https://na1.api.riotgames.com/lol/" + requestType + requestingId + "?api_key=" + key
},

makeRankedMatchlistURL = function(requestType, accountId, queueType, key) {
  return "https://na1.api.riotgames.com/lol/" + requestType + accountId + "?queue=" + queueType + "&api_key=" + key 
},

makeRequest = function(URL) {

  return new Promise(function(resolve, reject) {
    var request = https.get(URL, function (response) {
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
          console.log("This is the URL: " + URL)
          data = JSON.parse(buffer);
          resolve(data);
      });
      
      response.on("error", function (err) {
        resolve(Error(err));
      });
    });
  });
},

verifyPlayerRank = function(summonerId, rank) {
  var URL = makeURL(riotAPI.getSummonerRankBySummonerID, summonerId, key.key);
  var rankIsPlatinum
  var promise = makeRequest(URL).then(function(response) {
    console.log(response.tier);
    if(response.tier === rank || response.tier === "DIAMOND")
      rankIsPlatinum = true;
    else
      rankIsPlatinum = false;
  })
  return rankIsPlatinum;
},

getMatchParticipants = function(json, knownParticipants) {
  var participants = [];
  json.participantIdentities.forEach(function(entry) {
    
    if(knownParticipants.indexOf(entry.player.accountId) === -1) {
      participants.push(entry.player.accountId);
      console.log(entry.player.accountId);
    }
  })
  return participants;
}

module.exports = {
  testfunction: testfunction,
  makeURL: makeURL,
  makeRankedMatchlistURL: makeRankedMatchlistURL,
  makeRequest: makeRequest,
  getMatchParticipants: getMatchParticipants,
};