'use strict';

var https = require('https'),

testfunction = function() {
  console.log("test");
},

makeURL = function(requestType, requestingId, key) {
  return "https://na1.api.riotgames.com/lol/" + requestType + requestingId + "?api_key=" + key
}
module.exports = {
  testfunction: testfunction,
  makeURL: makeURL,
};