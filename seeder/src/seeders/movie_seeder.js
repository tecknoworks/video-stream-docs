const faker = require('faker')
const axios = require('axios').default
const VideoSeeder = require('./video_seeder')
const ImageSeeder = require('./image_seeder')
module.exports ={
    seed: async function(){
        var response1 = await axios.get('http://localhost:3001/details/genre/all');
            var genreList= Array.from(response1.data);
            
            var response2 = await axios.get('http://localhost:3001/details/actor/all');
            var actorList= Array.from(response2.data);
    
            
            var response3 = await axios.get('http://localhost:3001/details/content-rating/all');
            var contentRatingList= Array.from(response3.data);
    
            var response4 = await axios.get('http://localhost:3001/details/producer/all');
            var producerList= Array.from(response4.data);
    
            for(var i =0; i<20;i++){
                 axios.post('http://localhost:3000/movies/',
                    {
                        title: faker.name.title(),
                        description: faker.lorem.paragraphs(2,'.'),
                        producer: producerList[Math.floor(faker.random.number(producerList.length-1))].id,
                        releaseDate: faker.date.past(),
                        createdAt: faker.date.recent(1),
                        genre: genreList[Math.floor(faker.random.number(genreList.length-1))].id,
                        contentRating: contentRatingList[Math.floor(faker.random.number(contentRatingList.length-1))].id,
                        userRating: faker.random.number(9)+1,
                        actorList: [ 
                            actorList[Math.floor(faker.random.number(actorList.length-1))].id,
                            actorList[Math.floor(faker.random.number(actorList.length-1))].id,
                            actorList[Math.floor(faker.random.number(actorList.length-1))].id
                        ],
                        poster: `mv${(Math.floor(faker.random.number(3))+1)}`,
                        video: 'no-avaiable',
                        runtime: Math.floor(faker.random.number(10000))
        
                    }).then(async (result)=>{
                        await ImageSeeder.uploadFile(result.data.id)
                        await VideoSeeder.uploadFile(result.data.id)
                    })
                
                
            }
    }
} 