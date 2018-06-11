'use strict';

console.log('youtube.js');

function getYouTubeData() {
    axios.get("https://www.youtube.com/embed/", {

        params: {
            'listType': 'search',
            'list': 'riot'
        },
        headers: {
            // "Origin": "https://developer.riotgames.com",
            // "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            // "X-Riot-Token": "RGAPI-8a77322e-b580-4e2f-bf05-f54c82228bd1"
        } }).then(function (response) {
        console.log('here is the get response data', response);
        console.table(response.data);
        displayData(response);
    }).catch(function (error) {
        console.log('axios encountered an error!', error);
        //valueEl.value = 'UNDEFINED'
    });
}
//# sourceMappingURL=youtube.js.map
