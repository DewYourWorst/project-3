const { Schema, model } = require('mongoose');

const teamSchema = new Schema ({
  teamName: {
    type: String,
    required: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sport: [{
    type: Schema.Types.ObjectId,
    ref: 'Sport'
  }]
});

const Team = model ('Team', teamSchema);

module.exports = Team; 