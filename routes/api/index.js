
//call models, controllers, routes, & thought routes
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');


//middleware specific to the router?
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
module.exports = router;