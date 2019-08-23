const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const MovieSeeder = require('./seeders/movie_seeder')
const TvShowSeeder = require('./seeders/tvshow_seeder')
const EpisodeSeeder = require('./seeders/episode_seeder')


//Movie seeder
MovieSeeder.seed().then(() => console.log("Done seeding!"))


//Tv Show seeder
// TvShowSeeder.seed().then(
//     () => EpisodeSeeder.seed()).then(() => console.log("Done seeding!"))


app.listen(3020, () => console.log('seeder linstens on 3020.'))
