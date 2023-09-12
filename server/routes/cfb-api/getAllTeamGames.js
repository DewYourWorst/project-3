const router = require('express').Router();

router.get('/', (req, res) => {
var cfb = require('cfb.js');
var defaultClient = cfb.ApiClient.instance;

var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
ApiKeyAuth.apiKeyPrefix = 'Bearer';

var apiInstance = new cfb.GamesApi();

const year = req.query.year || 2023; 
const team = req.query.teamName || "Alabama"

console.log(year, team)

var opts = { 
  'team': team,

};
apiInstance.getGames(year, opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  res.json(data)
}, function(error) {
  console.error(error);
});
});

module.exports = router;