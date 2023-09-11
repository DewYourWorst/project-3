// const router = require('express').Router();


var cfb = require('cfb.js');
var defaultClient = cfb.ApiClient.instance;

var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
ApiKeyAuth.apiKeyPrefix = 'Bearer';

var apiInstance = new cfb.TeamsApi();

var opts = { 
  'conference': "SEC" // Get all the teams by conference as a string 
};
apiInstance.getTeams(opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});

// module.exports = router;
