const router = require('express').Router();
const rankings = require ('./nationalRankings')
const conference = require ('./getTeamsByConference')
const boxScore = require ('./boxScore')
const teamGames = require ('./getAllTeamGames')
const stats = require('./playerStats')

router.use ('/rankings', rankings)
router.use ('/conferences', conference)
router.use ('/box-score', boxScore)
router.use ('/games', teamGames)
router.use ('/stats', stats)

module.exports = router;