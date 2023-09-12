const router = require('express').Router();
const cfb = require('cfb.js');

router.get('/:conference', async (req, res) => {
  try {
    const conferenceName = req.params.conference;

    const defaultClient = cfb.ApiClient.instance;
    const ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
    ApiKeyAuth.apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';
    ApiKeyAuth.apiKeyPrefix = 'Bearer';

    const apiInstance = new cfb.TeamsApi();

    const opts = {
      'conference': conferenceName,
    };

    const data = await apiInstance.getTeams(opts);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
