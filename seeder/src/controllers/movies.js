const MovieSeeder = require('../seeders/movie_seeder')

module.exports = {
    seed: async function(req, res){
        var movieNr = req.body.movieNr;
        console.log(req.body);
        
        MovieSeeder.seed(movieNr).then(()=>res.send('Done seeding movies!'))
    },
    delete: async function(req, res){
        MovieSeeder.delete().then(()=> res.send('Done deleting movies.'))
    }
}