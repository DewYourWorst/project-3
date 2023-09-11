const router = require('express').Router();

router.get('/', (req, res) => {

var cfb = require('cfb.js');
var defaultClient = cfb.ApiClient.instance;

// Configure API key authorization: ApiKeyAuth
var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
ApiKeyAuth.apiKeyPrefix = 'Bearer';

var apiInstance = new cfb.GamesApi();

var year = 2023; // Number | Year/season filter for games

var opts = { 
  // 'week': 2, // Week number as a number
  'team': "Alabama", // Team name as a string

};
apiInstance.getGames(year, opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  res.json(data)
}, function(error) {
  console.error(error);
});

})

module.exports = router;