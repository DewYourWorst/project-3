const express = require('express');
const router = express.Router();
const User = require('./models/user'); 

// Create a new user
router.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await User.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all user
router.get('/user', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/user/:id', async (req, res) => {
  try {
    const team = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;