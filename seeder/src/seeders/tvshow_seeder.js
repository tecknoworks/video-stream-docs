const axios =require('axios').default
const faker = require('faker')
const fs = require('fs');
const config = require("../config");

const FormData = require('form-data');
const fetch = require('node-fetch');

const portraitImagesFolder = `${__dirname}/../../images/tv-shows/portrait`
const landscapeImagesFolder = `${__dirname}/../../images/tv-shows/landscape`
const videosFolder = `${__dirname}/../../videos`

module.exports={
    seed: async function(tvshowNr, seasonsNr){
        var response1 = await axios.get(`${config.screenplayDetailsBaseUrl}/genre/all`);
        var genreList= Array.from(response1.data);
        
        var response2 = await axios.get(`${config.screenplayDetailsBaseUrl}/actor/all`);
        var actorList= Array.from(response2.data);
            
        var response3 = await axios.get(`${config.screenplayDetailsBaseUrl}/content-rating/all`);
        var contentRatingList= Array.from(response3.data);

        var response4 = await axios.get(`${config.screenplayDetailsBaseUrl}/producer/all`);
        var producerList= Array.from(response4.data);               

        for(var i=0; i<tvshowNr; i++){
            var formData = new FormData();

            formData.append('title', faker.name.title())
            formData.append('description', faker.lorem.paragraphs(2,'.'))
            formData.append('producer', producerList[faker.random.number(producerList.length-1)].id)
            formData.append('releaseDate', faker.date.past().toLocaleDateString())
            formData.append('createdAt', faker.date.recent(1).toLocaleDateString())
            formData.append('genre', genreList[faker.random.number(genreList.length-1)].id)
            formData.append('contentRating', contentRatingList[faker.random.number(contentRatingList.length-1)].id)
            formData.append('actorList', JSON.stringify([ 
                actorList[faker.random.number(actorList.length-1)].id,
                actorList[faker.random.number(actorList.length-1)].id,
                actorList[faker.random.number(actorList.length-1)].id
            ]))
            formData.append('seasonsNo', seasonsNr)
            
            var portraitImageFiles=fs.readdirSync(portraitImagesFolder);
            formData.append('poster', fs.createReadStream( `${portraitImagesFolder}/${portraitImageFiles[faker.random.number(portraitImageFiles.length-1)]}`))

            var landscapeImageFiles=fs.readdirSync(landscapeImagesFolder);
            formData.append('landscapePoster', fs.createReadStream( `${landscapeImagesFolder}/${landscapeImageFiles[faker.random.number(landscapeImageFiles.length-1)]}`))

            var videoFiles=fs.readdirSync(videosFolder);
            formData.append('trailer', fs.createReadStream( `${videosFolder}/${videoFiles[faker.random.number(videoFiles.length-1)]}`))

            await fetch(`${config.tvShowBaseUrl}/insert`,{
                method: 'POST',
                body: formData
            })
        }
    },
    delete: async function(){
        var tvShowList = await fetch(`${config.tvShowBaseUrl}/all`,{method: 'GET'}).then(res => res.json());

        tvShowList.forEach(async (tvShow) =>{
            await fetch(`${config.tvShowBaseUrl}/delete?tvShowId=${tvShow.id}`,{method: 'DELETE'})
        })
    }
}