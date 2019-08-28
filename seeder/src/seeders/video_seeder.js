const faker = require('faker')
const axios = require('axios').default
const FormData = require('form-data')
const fs = require('fs');
const videosFolder = `${__dirname}/../../videos`

module.exports = {
    uploadFile: async function(videoName){
        var formData = new FormData()

        var files=fs.readdirSync(videosFolder);
        var fileName=files[faker.random.number(files.length-1)]
        formData.append('video',fs.createReadStream( `${videosFolder}/${fileName}`))
        formData.append('name', videoName)


        formData.submit('http://localhost:3003/videos/upload', function(err, res){
        })

        return fileName
    },
    uploadFileWithCaption: async function(videoName){
        var formData = new FormData()

        var files=fs.readdirSync(videosFolder);
        var fileName=files[faker.random.number(files.length-1)]
        formData.append('video',fs.createReadStream( `${videosFolder}/${fileName}`))
        formData.append('name', videoName)


        formData.submit('http://localhost:3003/videos/upload-with-caption', function(err, res){
        })

        return fileName
    }
}