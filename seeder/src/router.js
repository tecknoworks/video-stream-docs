const express = require('express')
const router = express.Router()
const MovieController = require('./controllers/movies');
const TvShowController = require('./controllers/tv-shows')

router
    .route('/movies')
    .post(MovieController.seed)
    .delete(MovieController.delete)

router
    .route('/tv-shows')
    .post(TvShowController.seed)
    .delete(TvShowController.delete)

module.exports = router;