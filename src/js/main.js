console.log("AJAX-FINAL");
// accountID = 32735733

// (function() {


let userResultsEl = document.querySelector('.userResults');
let rankResultsEl = document.querySelector('.rankResults');
let searchTerm = document.getElementById('summoner-name');
let srchBtn = document.querySelector('.search-btn');
let summonerName = searchTerm;





srchBtn.addEventListener('click', function(e) {
	e.preventDefault();
    const summonerName = searchTerm.value;
    console.log(summonerName, "summonerName");
	searchStats(summonerName);
    searchMatches();
    // searchProfileIcon();
    // searchChampions();

});





	function searchStats(summonerName) {
        axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

            params: {
            '_ep':'/lol/summoner/v3/summoners/by-name/' + summonerName,
            'api_key':'RGAPI-1fc325aa-1ea5-41f0-b4ba-80e897fc27c8',
        },
            })
        .then(function (response) {
            // console.log('here is the get response data',response);
            console.table(response.data);
            

            let accountId = response.data.accountId;
            let playerId = response.data.id;

            searchRank(playerId);
            searchMatches(accountId);
            displayData(response);

        })
        .catch(function (error) {
         console.log('axios encountered an error!', error);
        }); 
    }


    function searchMatches(accountId) {
        axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

            params: {
            'beginIndex': 0,
            'endIndex': 10,
            '_ep':'/lol/match/v3/matchlists/by-account/' + accountId,
            'api_key':'RGAPI-1fc325aa-1ea5-41f0-b4ba-80e897fc27c8',
        },
            })
        .then(function (response) {
            // console.log('here is the get response data',response);
            console.table(response.data);
            
        })
        .catch(function (error) {
         console.log('axios encountered an error!', error);
        }); 
    }



      function searchRank(playerId) {
        axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

            params: {
            '_ep':'/lol/league/v3/positions/by-summoner/' + playerId,
            'api_key':'RGAPI-1fc325aa-1ea5-41f0-b4ba-80e897fc27c8',
        },
            })
        .then(function (response) {
            // console.log('here is the get response data',response);
            console.table(response.data);
            getRankValues(response.data);
            
        })
        .catch(function (error) {
         console.log('axios encountered an error!', error);
        }); 
    }

    function getRankValues(rankArray) {

        for (var i = 0; i <= rankArray.length - 1; i++) {
            console.log(rankArray[i])

            
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

            

            let pProfileName = document.createElement('p');
            let pAccountLvl = document.createElement('p');
            let userLiEl = document.createElement('li');

            pProfileName.innerHTML = 'Summoner Name: ' + profileName;
            pAccountLvl.innerHTML = 'Account Level: ' + accountLvl;
            
            userLiEl.appendChild(pProfileName);
            userLiEl.appendChild(pAccountLvl);
            userResultsEl.appendChild(userLiEl);

            // let profileNameText = document.createTextNode(profileName);
            // let accountLvlText = document.createTextNode(accountLvl);



            // pEl.appendChild(profileNameText);
            // pEl.appendChild(accountLvlText);
            // resultsEl.appendChild(pEl);
            


    }




// })(); 





// rate limit of 10 call per hour

    // function searchChampions() {
    //     axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

    //         params: {
    //         'champData':'image',
    //         'tags': 'image',
    //         '_ep':'/lol/static-data/v3/champions/21/',
    //         'api_key':'RGAPI-8a77322e-b580-4e2f-bf05-f54c82228bd1',
    //     },
    //          headers: {
    //             // "Origin": "https://developer.riotgames.com",
    //             // "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    //             // "X-Riot-Token": "RGAPI-8a77322e-b580-4e2f-bf05-f54c82228bd1"
    //         }})
    //     .then(function (response) {
    //         console.log('here is the get response data',response);
    //         console.table(response.data);
    //         displayData(response);

    //     })
    //     .catch(function (error) {
    //      console.log('axios encountered an error!', error);
    //      //valueEl.value = 'UNDEFINED'
    //     }); 
    // }
  // function searchProfileIcon() {
    //     axios.get("http://circuslabs.net/proxies/riotgames-proxy/",{

    //         params: {
    //         '_ep':'/lol/static-data/v3/profile-icons/',
    //         'api_key':'RGAPI-1fc325aa-1ea5-41f0-b4ba-80e897fc27c8',
    //     },
    //          headers: {
    //             // "Origin": "https://developer.riotgames.com",
    //             // "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    //             // "X-Riot-Token": "RGAPI-e6a82438-350b-41c0-aefd-18f3e9c2ba54"
    //         }})
    //     .then(function (response) {
    //         // console.log('here is the get response data',response.data);
    //         displayProfileImg(response.data);




    //     })
    //     .catch(function (error) {
    //      console.log('axios encountered an error!', error);
    //     }); 
    // }
    // function displayProfileImg(imgArray) {
    //     console.log(imgArray)
    //     for (var i = imgArray.length - 1; i >= 0; i++) {
    //         console.log(imgArray[i]);
    //     }

    // }





//rate limit of 10 calls per hour

