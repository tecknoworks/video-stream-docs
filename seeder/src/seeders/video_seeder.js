const faker = require('faker')
const axios = require('axios').default
const FormData = require('form-data')

module.exports = {
    uploadFile: async function(videoName){
        var formData = new FormData()
        const fs = require('fs');

        var files=fs.readdirSync('C:\\projects\\seeder\\videos');
        var fileName=files[faker.random.number(files.length-1)]
        formData.append('video',fs.createReadStream( `videos/${fileName}`))
        formData.append('name', videoName)


        formData.submit('http://localhost:3003/videos/upload', function(err, res){
        })

        return fileName
    },
    uploadFileWithCaption: async function(videoName){
        var formData = new FormData()
        const fs = require('fs');

        var files=fs.readdirSync('C:\\projects\\seeder\\videos');
        var fileName=files[faker.random.number(files.length-1)]
        formData.append('video',fs.createReadStream( `videos/${fileName}`))
        formData.append('name', videoName)


        formData.submit('http://localhost:3003/videos/upload-with-caption', function(err, res){
        })

        return fileName
    }
}