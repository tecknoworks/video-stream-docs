const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const extractFrames = require('ffmpeg-extract-frames')
 
async function test(){
    await extractFrames({
        input: 'videos\\Metropole - 2337.mp4',
        output: './images/screenshot.jpg',
        offsets: [
          1000,
        ]
      })
}

test()