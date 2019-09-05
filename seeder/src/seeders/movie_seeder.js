const faker = require('faker')
const axios = require('axios').default
const fetch = require('node-fetch');

const fs = require('fs');
const FormData = require('form-data');

const portraitImagesFolder = `${__dirname}/../../images/movies/portrait`
const landscapeImagesFolder = `${__dirname}/../../images/movies/landscape`
const videosFolder = `${__dirname}/../../videos`

module.exports ={
    seed: async function(movieNr){
            var response1 = await axios.get('http://localhost:3001/details/genre/all');
            var genreList= Array.from(response1.data);
            
            var response2 = await axios.get('http://localhost:3001/details/actor/all');
            var actorList= Array.from(response2.data);
             
            var response3 = await axios.get('http://localhost:3001/details/content-rating/all');
            var contentRatingList= Array.from(response3.data);
    
            var response4 = await axios.get('http://localhost:3001/details/producer/all');
            var producerList= Array.from(response4.data);
            
            for(var i =0; i<movieNr;i++){
                try {
                    var formData = new FormData();

                    formData.append('title',faker.name.title())
                    formData.append('description',faker.lorem.paragraphs(2,'.'))
                    formData.append('producer',producerList[Math.floor(faker.random.number(producerList.length-1))].id)
                    formData.append('releaseDate',faker.date.between('2019-01-01','2019-12-31').toDateString())
                    formData.append('createdAt',faker.date.recent(1).toDateString())
                    formData.append('genre',genreList[Math.floor(faker.random.number(genreList.length-1))].id)
                    formData.append('contentRating',contentRatingList[Math.floor(faker.random.number(contentRatingList.length-1))].id)
                    formData.append('actorList',JSON.stringify([ 
                        actorList[Math.floor(faker.random.number(actorList.length-1))].id,
                        actorList[Math.floor(faker.random.number(actorList.length-1))].id,
                        actorList[Math.floor(faker.random.number(actorList.length-1))].id
                    ]))

                    var portraitImageFiles=fs.readdirSync(portraitImagesFolder);
                    formData.append('poster', fs.createReadStream( `${portraitImagesFolder}/${portraitImageFiles[faker.random.number(portraitImageFiles.length-1)]}`))

                    var landscapeImageFiles=fs.readdirSync(landscapeImagesFolder);
                    formData.append('landscapePoster', fs.createReadStream( `${landscapeImagesFolder}/${landscapeImageFiles[faker.random.number(landscapeImageFiles.length-1)]}`))

                    var videoFiles=fs.readdirSync(videosFolder);
                    formData.append('video', fs.createReadStream( `${videosFolder}/${videoFiles[faker.random.number(videoFiles.length-1)]}`))
                    
                    await fetch('http://localhost:3000/movies/',{
                        method: 'POST',
                        body: formData
                    })
                    
                } catch (error) {
                    console.log(error);
                    
                }
                
            }
    },
    delete: async function(){
        let movieList = await fetch('http://localhost:3000/movies/all',{
            method: 'GET'
        }).then(res => res.json());

        movieList.forEach(async (movie)=>{
            await fetch(`http://localhost:3000/movies/delete?movieId=${movie.id}`,{
                method: 'DELETE'
            })
        })
    }
} 