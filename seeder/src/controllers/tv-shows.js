const TvShowSeeder = require('../seeders/tvshow_seeder')
const EpisodeSeeder = require('../seeders/episode_seeder')

module.exports = {
    seed: async function (req, res) {
        //setting defaults in case of null
        var tvShowNr = req.body.tvShowNr != null ? req.body.tvShowNr : 5;
        var episodeNr = req.body.episodeNr != null ? req.body.episodeNr : 3;
        var seasonsNr = req.body.seasonsNr != null ? req.body.seasonsNr : 5;

        TvShowSeeder.seed(tvShowNr, seasonsNr).then(() => {
            EpisodeSeeder.seed(episodeNr, seasonsNr).then(() =>
                res.send('Done seeding tv shows and episodes.')
            )
        });
    },
    delete: async function (req, res) {
        TvShowSeeder.delete().then(() => {
            EpisodeSeeder.delete().then(() => res.send('Done deleting tv shows and episodes.'))
        })

    }
}