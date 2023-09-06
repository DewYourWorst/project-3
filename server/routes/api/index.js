const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const sportRoutes = require('./sport.routes');
const teamRoutes = require('./team.routes')

// const sportRoutes = require('./sport');
// const teamRoutes = require('./team');
// const userRoutes = require('./user');
// These routes do the same job but do not utilize the controllers we set up, keeping these here to give us the option to pivot to this later on if we want to 

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/sport', sportRoutes);
router.use('/team', teamRoutes)



module.exports = router;
