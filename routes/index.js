//require 

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).send('<h1> ERROR 404 </h1>'); });

    //router export
module.exports = router;