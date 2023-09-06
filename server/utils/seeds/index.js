const dbConnection = require('../../config/connection');
const mongoose = require('mongoose')

const { User, Team, Sport} = require('../../models');

const users = require('./users.json');
const mlbTeams = require('./mlb.teams.json')
const eplTeams = require('./epl.teams.json')
const mlsTeams = require('./mls.teams.json')
const nbaTeams = require('./nba.teams.json')
const ncaafTeams = require('./ncaaf.teams.json')
const nhlTeams = require('./nhl.teams.json')
const nflTeams = require('./nfl.teams.json')
const wnbaTeams = require('./wnba.teams.json')
const ncaamTeams = require('./ncaam.teams.json')
const ncaawTeams = require('./ncaaw.teams.json')
const sports = require('./sports.json');

async function seedDatabase() {
  try {
    await dbConnection;

    await User.insertMany(users); 

    await Team.insertMany(mlbTeams);
    await Team.insertMany(eplTeams);
    await Team.insertMany(mlsTeams);
    await Team.insertMany(mlbTeams);
    await Team.insertMany(nbaTeams);
    await Team.insertMany(ncaafTeams);
    await Team.insertMany(nhlTeams);
    await Team.insertMany(nflTeams);
    await Team.insertMany(wnbaTeams);
    await Team.insertMany(ncaamTeams);
    await Team.insertMany(ncaawTeams);

    await Sport.insertMany(sports)

    console.log('data seeded successfully');
  } catch (error) {
    console.log('error seeding data', error)
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();

