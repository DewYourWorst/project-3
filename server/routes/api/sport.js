const express = require('express');
const router = express.Router();
const Sport = require('./models/sport'); 

// Create a new sport
router.post('/sport', async (req, res) => {
  try {
    const sport = new Sport(req.body);
    await sport.save();
    res.status(201).json(sport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all sports
router.get('/sport', async (req, res) => {
  try {
    const sport = await Sport.find();
    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a sport by ID
router.put('/sport/:id', async (req, res) => {
  try {
    const sport = await Sport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a sport by ID
router.delete('/sport/:id', async (req, res) => {
  try {
    await Sport.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;