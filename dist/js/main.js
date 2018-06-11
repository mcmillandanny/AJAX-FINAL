'use strict';

console.log("AJAX-FINAL");
// accountID = 32735733


var userResultsEl = document.querySelector('.userResults');
var imgResultsEl = document.querySelector('.imgResults');
var rankResultsEl = document.querySelector('.rankResults');
var searchTerm = document.getElementById('summoner-name');
var srchBtn = document.querySelector('.search-btn');
var clrBtn = document.querySelector('.clear-btn');

srchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var summonerName = searchTerm.value;
    console.log(summonerName, "summonerName");
    searchStats(summonerName);
});

clrBtn.addEventListener('click', function () {
    userResultsEl.innerHTML = '';
    rankResultsEl.innerHTML = '';
    console.log('clicked');
});

//   function searchProfileIcon() {
//     axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

//         params: {
//         '_ep':'/lol/static-data/v3/profile-icons/',
//         'api_key':'RGAPI-c549b0c6-7bd0-446c-b029-57b116a2890c',
//     }

//          })
//     .then(function (response) {
//         console.log('here is the get response data',response.data);

//         let results = response.data.data;
//         for ( let i in results) {
//             let result = results[i];

//             let spirteArt = result.image.sprite;

//             let imgEl = document.createElement('img');

//             imgEl.innerHTML = spirteArt;
//             console.log(imgEl);

//             imgResultsEl.appendChild(imgEl);

//         }


//     })
//     .catch(function (error) {
//      console.log('axios encountered an error!', error);
//     }); 
// }


function searchStats(summonerName) {
    axios.get("http://circuslabs.net/proxies/riotgames-proxy/", {

        params: {
            '_ep': '/lol/summoner/v3/summoners/by-name/' + summonerName,
            'api_key': 'RGAPI-c549b0c6-7bd0-446c-b029-57b116a2890c'
        }
    }).then(function (response) {
        console.table(response.data);

        var accountId = response.data.accountId;
        var playerId = response.data.id;
        var profileIconId = response.data.profileIconId;

        searchRank(playerId);
        displayData(response);
    }).catch(function (error) {
        console.log('axios encountered an error!', error);
    });
}

function searchRank(playerId) {
    axios.get("http://circuslabs.net/proxies/riotgames-proxy/", {

        params: {
            '_ep': '/lol/league/v3/positions/by-summoner/' + playerId,
            'api_key': 'RGAPI-c549b0c6-7bd0-446c-b029-57b116a2890c'
        }
    }).then(function (response) {

        getRankValues(response.data);
    }).catch(function (error) {
        console.log('axios encountered an error!', error);
    });
}

function getRankValues(rankArray) {

    for (var i = 0; i <= rankArray.length - 1; i++) {

        var wins = rankArray[i].wins;
        var losses = rankArray[i].losses;
        var rank = rankArray[i].tier;
        var points = rankArray[i].leaguePoints;
        var leagueName = rankArray[i].leagueName;

        var rankLiEl = document.createElement('li');
        var winsPEl = document.createElement('p');
        var lossesPEl = document.createElement('p');
        var currentRanksPEl = document.createElement('p');
        var pointsPEl = document.createElement('p');
        var leagueNamePEl = document.createElement('p');

        currentRanksPEl.innerHTML = 'Summoner Rank: ' + rank;
        leagueNamePEl.innerHTML = 'Division: ' + leagueName;
        winsPEl.innerHTML = 'Wins: ' + wins;
        lossesPEl.innerHTML = 'Losses: ' + losses;
        pointsPEl.innerHTML = 'Ladder Points: ' + points;

        rankLiEl.appendChild(currentRanksPEl);
        rankLiEl.appendChild(winsPEl);
        rankLiEl.appendChild(lossesPEl);
        rankLiEl.appendChild(leagueNamePEl);
        rankLiEl.appendChild(pointsPEl);

        rankResultsEl.appendChild(rankLiEl);
    }
}

function displayData(response) {
    var profileName = response.data.name;
    var accountLvl = response.data.summonerLevel;
    var profileImg = response.data;

    var pProfileName = document.createElement('p');
    var pAccountLvl = document.createElement('p');
    var userLiEl = document.createElement('li');

    pProfileName.innerHTML = 'Summoner Name: ' + profileName;
    pAccountLvl.innerHTML = 'Account Level: ' + accountLvl;

    userLiEl.appendChild(pProfileName);
    userLiEl.appendChild(pAccountLvl);
    userResultsEl.appendChild(userLiEl);
}
//# sourceMappingURL=main.js.map
