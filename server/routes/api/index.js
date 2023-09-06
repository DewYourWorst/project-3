const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const sportRoutes = require('./sport.routes');
const teamRoutes = require('./team.routes')
=======
const sportRoutes = require('./sport');
const teamRoutes = require('./team');
const userRoutes = require('./user');



router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/sport', sportRoutes);

router.use('/team', teamRoutes)
=======
router.use('/team', teamRoutes);
router.use('/user', userRoutes);


module.exports = router;
