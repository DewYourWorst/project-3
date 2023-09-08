const router = require('express').Router();
const testRoute = require('../../../client/src/test');

router.use('/test', testRoute)

module.exports = router;