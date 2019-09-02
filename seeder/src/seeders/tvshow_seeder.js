const axios =require('axios').default
const faker = require('faker')
const fs = require('fs');

const FormData = require('form-data');
const fetch = require('node-fetch');

const imagesFolder = `${__dirname}/../../images`
const videosFolder = `${__dirname}/../../videos`

module.exports={
    seed: async function(tvshowNr){
        var response1 = await axios.get('http://localhost:3001/details/genre/all');
        var genreList= Array.from(response1.data);
        
        var response2 = await axios.get('http://localhost:3001/details/actor/all');
        var actorList= Array.from(response2.data);

        
        var response3 = await axios.get('http://localhost:3001/details/content-rating/all');
        var contentRatingList= Array.from(response3.data);

        var response4 = await axios.get('http://localhost:3001/details/producer/all');
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
            formData.append('userRating', faker.random.number(10))
            formData.append('actorList', JSON.stringify([ 
                actorList[faker.random.number(actorList.length-1)].id,
                actorList[faker.random.number(actorList.length-1)].id,
                actorList[faker.random.number(actorList.length-1)].id
            ]))
            formData.append('seasonsNo', 5)
            
            var imageFiles=fs.readdirSync(imagesFolder);
            formData.append('poster', fs.createReadStream( `${imagesFolder}/${imageFiles[faker.random.number(imageFiles.length-1)]}`))

            var videoFiles=fs.readdirSync(videosFolder);
            formData.append('trailer', fs.createReadStream( `${videosFolder}/${videoFiles[faker.random.number(videoFiles.length-1)]}`))

            await fetch('http://localhost:3004/tv-shows/insert',{
                method: 'POST',
                body: formData
            })
        }

    },
    delete: async function(){
        var tvShowList = await fetch('http://localhost:3004/tv-shows/all').then(res => res.json());

        tvShowList.forEach(async (tvShow) =>{
            await fetch(`http://localhost:3004/tv-shows/delete?tvShowId=${tvShow.id}`,{method: 'DELETE'})
        })
    }
}