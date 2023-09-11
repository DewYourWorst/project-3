const router = require('express').Router();
router.get('/', (req, res) => {

var cfb = require('cfb.js');
var defaultClient = cfb.ApiClient.instance;

var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
ApiKeyAuth.apiKeyPrefix = 'Bearer';

var apiInstance = new cfb.GamesApi();

var year = 2023; // Number | Year/season filter for games

var opts = { 
  'week': 1, // Number | Week filter
  'seasonType': "regular", // String | Season type filter (regular or postseason)
  'team': "Alabama", // String | Team filter
  'conference': "SEC", // String | Conference abbreviation filter
  'gameId': 401520149, // Number | Game id filter
  'classification': "fbs" // String | Division classification filter (fbs/fcs/ii/iii)
};
apiInstance.getTeamGameStats(year, opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  res.json(data)
}, function(error) {
  console.error(error);
});
})

module.exports = router;