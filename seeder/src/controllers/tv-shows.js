const TvShowSeeder = require('../seeders/tvshow_seeder')
const EpisodeSeeder = require('../seeders/episode_seeder')

module.exports ={
    seed: async function(req, res){
        var tvShowNr = req.body.tvShowNr;
        var episodeNr = req.body.episodeNr;
        TvShowSeeder.seed(tvShowNr).then(()=>{
            EpisodeSeeder.seed(episodeNr).then(()=>
                res.send('Done seeding tv shows and episodes.')
            )
        });
    },
    delete: async function(req, res){
        TvShowSeeder.delete().then(()=>res.send('Done deleting tv shows and episodes.'))
    }
}