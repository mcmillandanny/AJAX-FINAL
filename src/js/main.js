console.log("AJAX-FINAL");
// accountID = 32735733


let userResultsEl = document.querySelector('.userResults');
let imgResultsEl = document.querySelector('.imgResults');
let rankResultsEl = document.querySelector('.rankResults');
let searchTerm = document.getElementById('summoner-name');
let srchBtn = document.querySelector('.search-btn');
let clrBtn = document.querySelector('.clear-btn');







srchBtn.addEventListener('click', function(e) {
	e.preventDefault();
    let summonerName = searchTerm.value;
    console.log(summonerName, "summonerName");
	searchStats(summonerName);

});


clrBtn.addEventListener('click', function() {
    userResultsEl.innerHTML = '';
    rankResultsEl.innerHTML = '';
    console.log('clicked');
})


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
        axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

            params: {
            '_ep':'/lol/summoner/v3/summoners/by-name/' + summonerName,
            'api_key':'RGAPI-c549b0c6-7bd0-446c-b029-57b116a2890c',
        },
            })
        .then(function (response) {
            console.table(response.data);
            

            let accountId = response.data.accountId;
            let playerId = response.data.id;
            let profileIconId = response.data.profileIconId;
            
            searchRank(playerId);
            displayData(response);

        })
        .catch(function (error) {
         console.log('axios encountered an error!', error);
        }); 
    }


      function searchRank(playerId) {
        axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

            params: {
            '_ep':'/lol/league/v3/positions/by-summoner/' + playerId,
            'api_key':'RGAPI-c549b0c6-7bd0-446c-b029-57b116a2890c',
        },
            })
        .then(function (response) {
          
            getRankValues(response.data);
            
        })
        .catch(function (error) {
         console.log('axios encountered an error!', error);
        }); 
    }

    function getRankValues(rankArray) {

        for (var i = 0; i <= rankArray.length - 1; i++) {
            
            const wins = rankArray[i].wins;
            const losses = rankArray[i].losses;
            const rank = rankArray[i].tier;
            const points = rankArray[i].leaguePoints;    
            const leagueName = rankArray[i].leagueName
        

            let rankLiEl = document.createElement('li')
            let winsPEl = document.createElement('p');
            let lossesPEl = document.createElement('p');
            let currentRanksPEl = document.createElement('p');
            let pointsPEl = document.createElement('p');
            let leagueNamePEl = document.createElement('p');
            
            currentRanksPEl.innerHTML= 'Summoner Rank: ' + rank;
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
            let profileName = response.data.name;
            let accountLvl = response.data.summonerLevel;
            let profileImg = response.data;

            let pProfileName = document.createElement('p');
            let pAccountLvl = document.createElement('p');
            let userLiEl = document.createElement('li');

            pProfileName.innerHTML = 'Summoner Name: ' + profileName;
            pAccountLvl.innerHTML = 'Account Level: ' + accountLvl;
            
            userLiEl.appendChild(pProfileName);
            userLiEl.appendChild(pAccountLvl);
            userResultsEl.appendChild(userLiEl);
            


    }




