const axios = require('axios').default
const faker = require('faker')
const fs = require('fs');

const fetch = require('node-fetch');
const FormData = require('form-data');

const config = require('../config');

const imagesFolder = `${__dirname}/../../images`
const videosFolder = `${__dirname}/../../videos`

module.exports = {
    seed: async function(episodeNr, seasonsNr){
        var response = await axios.get(`${config.tvShowBaseUrl}/all`);
        
        var tvshowList= Array.from(response.data);
        for(var i=0; i<tvshowList.length;i++){
            for(var j=1;j<=seasonsNr;j++){
                for(var k=1; k<=episodeNr;k++){
                    var formData = new FormData();

                    formData.append('title', faker.name.title())
                    formData.append('description', faker.lorem.paragraphs(2,'.')),
                    formData.append('seasonNo', j)
                    formData.append('episodeNo', k)
                    formData.append('tvShowId', tvshowList[i].id)
                    formData.append('releaseDate', faker.date.past(10).toLocaleDateString())
                    formData.append('createdAt', new Date().toLocaleDateString())
    
                    var videoFiles=fs.readdirSync(videosFolder);
                    formData.append('video', fs.createReadStream( `${videosFolder}/${videoFiles[faker.random.number(videoFiles.length-1)]}`))

                    await fetch(`${config.tvShowBaseUrl}/episode/insert`,{
                        method: 'POST',
                        body: formData
                    })
                }
            }
        }
    },
    delete: async function(){
        var episodeList = await fetch(`${config.tvShowBaseUrl}/episode/all`,{method: 'GET'}).then(res => res.json());
        
        episodeList.forEach(async (episode) =>{
            await fetch(`${config.tvShowBaseUrl}/episode/delete?episodeId=${episode.id}`,{method: 'DELETE'})
        })
    }
}