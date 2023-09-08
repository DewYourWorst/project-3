const router = require('express').Router();
const apiRoutes = require('./api');
const cfbAPIRoutes = require('./cfb-api')

router.use('/api', apiRoutes);
router.use('/cfb-api', cfbAPIRoutes)

module.exports = router;
