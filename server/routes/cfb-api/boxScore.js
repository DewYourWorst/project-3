var cfb = require('cfb.js');
var defaultClient = cfb.ApiClient.instance;

// Configure API key authorization: ApiKeyAuth
var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
ApiKeyAuth.apiKeyPrefix = 'Bearer';

var apiInstance = new cfb.GamesApi();

var gameId = 401520149; // Game id as a number 

apiInstance.getAdvancedBoxScore(gameId).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});