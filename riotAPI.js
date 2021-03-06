'use strict';

var riotAPI = {
    getMatchByMatchID : "match/v3/matches/",
    getMatchListByAccount : "match/v3/matchlists/by-account/",
    getMatchTimelineByMatchID : "match/v3/timelines/by-match/",
    getSummonerBySummonerName : "summoner/v3/summoners/by-name/",
    getSummonerRankBySummonerID : "league/v3/positions/by-summoner/",
}

module.exports = riotAPI;