const router = require('express').Router();

const cardsRoute = require('./cards');
const usersRoutes = require('./users');
const errorRoute = require('./error');

router.use('/', cardsRoute);
router.use('/', usersRoutes);
router.use('*', errorRoute);

module.exports = router;
