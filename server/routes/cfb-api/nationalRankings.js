// define router so express can listen to routes
const router = require('express').Router();

router.get('/', (req, res) => {
  var cfb = require('cfb.js');
  var defaultClient = cfb.ApiClient.instance;
  
  var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
  ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
  ApiKeyAuth.apiKeyPrefix = 'Bearer';
  
  var apiInstance = new cfb.RankingsApi();
  
  let year = 2023; 
  let week = 1;
  
  var opts = { 
    'week': week, 
    'seasonType': "regular" 
  };
  apiInstance.getRankings(year, opts).then(function(data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    res.json(data)
  }, function(error) {
    console.error(error);
  });
  
})

// export route
module.exports = router;