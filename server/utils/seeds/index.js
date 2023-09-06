const connect = require('../../config/connection');
const mongoose = require('mongoose')
const users = require('./users.json');
const mlbTeams = require('./mlb.teams.json')
const eplTeams = require('./epl.teams.json')
const mlsTeams = require('./mls.teams.json')
const nbaTeams = require('./nba.teams.json')
const ncaaf = require('./ncaaf.teams.json')
const nhlTeams = require('./nhl.teams.json')
const nflTeams = require('./nfl.teams.json')
const wnbaTeams = require('./wnba.teams.json')
const ncaamTeams = require('./ncaam.teams.json')
const ncaawTeams = require('./ncaaw.teams.json')
const sports = require('./sports.json');

const { User, Team, Sport} = require('../../models');

