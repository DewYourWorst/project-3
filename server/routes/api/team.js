const express = require('express');
const router = express.Router();
const Team = require('./models/team'); 

// Create a new team
router.post('/team', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(sport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all teams
router.get('/team', async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a team by ID
router.put('/team/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a team by ID
router.delete('/team/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;