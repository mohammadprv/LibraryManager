const router = require('express').Router();

const { bookRoutes } = require('../routes/book');

router.use("/admin", bookRoutes);


module.exports = {
    AllRoutes: router
}