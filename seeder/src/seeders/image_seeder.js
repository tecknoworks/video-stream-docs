const faker = require('faker')
const axios = require('axios').default
const FormData = require('form-data')
const fs = require('fs');

module.exports = {
    uploadFile: async function(imageName){
        var formData = new FormData()
        
        var files=fs.readdirSync('C:\\projects\\seeder\\images');
        formData.append('image',fs.createReadStream( `images/${files[faker.random.number(files.length-1)]}`))
        formData.append('name', imageName)


        formData.submit('http://localhost:3002/assets/image/upload', function(err, res){
        })
    },
    uploadVideoFrame: async function(imageName){
        var formData = new FormData()

        formData.append('image',fs.createReadStream( `images/screenshot.jpg`))
        formData.append('name', imageName)
    
    
        formData.submit('http://localhost:3002/assets/image/upload', function(err, res){
        })
    }
}