var cfb = require('cfb.js');
var defaultClient = cfb.ApiClient.instance;

// Configure API key authorization: ApiKeyAuth
var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
ApiKeyAuth.apiKeyPrefix = 'Bearer';

var apiInstance = new cfb.RankingsApi();

var year = 2023; // Number | Year/season filter for games

var opts = { 
  'week': 1, // Week as a number 
  'seasonType': "regular" // String | Season type filter (regular or postseason)
};
apiInstance.getRankings(year, opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});