const { Schema, model } = require('mongoose');

const sportSchema = new Schema({
  sportName: {
    type: String, 
    required: true
  },
  sportGender: {
    type: Boolean,
    required: true
  }
});

const Sport = model ('Sport', sportSchema)

module.exports = Sport;