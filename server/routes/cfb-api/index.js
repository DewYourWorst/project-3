const router = require('express').Router();
const rankings = require ('./nationalRankings')
const conference = require ('./getTeamsByConference')

router.use('/rankings', rankings)
// router.use ('/conferences', conference)

module.exports = router;