const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const sportRoutes = require('./sport.routes');
const teamRoutes = require('./team.routes')




router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/sport', sportRoutes);

router.use('/team', teamRoutes)



module.exports = router;
