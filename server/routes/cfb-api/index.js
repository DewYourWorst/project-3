const router = require('express').Router();
const rankings = require ('./nationalRankings')
const conference = require ('./getTeamsByConference')
const boxScore = require ('./boxScore')
const teamGames = require ('./getAllTeamGames')
const stats = require('./playerStats')
const newBoxScore = require ('./newBoxScore')


router.use ('/rankings', rankings)
router.use ('/conferences', conference)
router.use ('/box-score', boxScore)
router.use ('/games', teamGames)
router.use ('/stats', stats)
router.use ('/new-box-score', newBoxScore)

module.exports = router;