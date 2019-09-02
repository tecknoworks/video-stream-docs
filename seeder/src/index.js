const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger= require('morgan');
const fs = require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'))

const router = require('./router');

const imagesFolder = `${__dirname}/../images`
const videosFolder = `${__dirname}/../videos`

if(!fs.existsSync(videosFolder)){
    console.log(`Creating videos folder with path: ${videosFolder}`);
    fs.mkdirSync(videosFolder);
}
if(!fs.existsSync(imagesFolder)){
    console.log(`Creating images folder with path: ${imagesFolder}`);
    fs.mkdirSync(imagesFolder);
}

app.use('/seeder', router);

app.listen(3020, () => console.log('seeder linstens on 3020.'))
