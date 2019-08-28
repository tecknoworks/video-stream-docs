const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

const videosFolder = `${__dirname}/../videos`;
const imagesfolder = `${__dirname}/../images`;

if(!fs.existsSync(videosFolder)){
    console.log(`Creating videos folder with path: ${videosfolder}`);
    fs.mkdirSync(videosFolder);
}
if(!fs.existsSync(imagesfolder)){
    console.log(`Creating images folder with path: ${imagesfolder}`);
    fs.mkdirSync(imagesfolder);
}

const MovieSeeder = require('./seeders/movie_seeder')
const TvShowSeeder = require('./seeders/tvshow_seeder')
const EpisodeSeeder = require('./seeders/episode_seeder')

//Movie seeder
MovieSeeder.seed().then(() => console.log("Done seeding!"))


//Tv Show seeder
// TvShowSeeder.seed().then(
//     () => EpisodeSeeder.seed()).then(() => console.log("Done seeding!"))


app.listen(3020, () => console.log('seeder linstens on 3020.'))
