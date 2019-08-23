const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const extractFrames = require('ffmpeg-extract-frames')

module.exports = {
  extract: async function(videoName){
    await extractFrames({
      input: `videos/${videoName}`,
      output: './images/screenshot.jpg',
      offsets: [
        1000,
      ]
    })
  }
}