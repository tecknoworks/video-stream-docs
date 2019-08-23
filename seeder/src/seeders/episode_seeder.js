const axios = require('axios').default
const faker = require('faker')
const VideoSeeder = require('./video_seeder')
const ImageSeeder = require('./image_seeder')
const ExtractFrame = require('../helpers/extract_frame')

module.exports = {
    seed: async function(){
        var response = await axios.get('http://localhost:3004/tv-shows/all');
        var tvshowList= Array.from(response.data);
        for(var i=0; i<tvshowList.length;i++){
            for(var j=1;j<=7;j++){
                for(var k=1;k<=3;k++){
                    axios.post('http://localhost:3004/tv-shows/episode/',{
                        title: faker.name.title(),
                        description: faker.lorem.paragraphs(2,'.'),
                        seasonNo: j,
                        episodeNo: k,
                        tvShowId: tvshowList[i].id,
                        releaseDate: faker.date.past(10),
                        createdAt: new Date(),
                        runtime: faker.random.number(10000)
                    }).then(async(result)=>{
                        var fileName=await VideoSeeder.uploadFileWithCaption(result.data.id)
                    })
                    setInterval(()=>{},500)
                }
            }
        }
    }
}