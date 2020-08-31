const { google } = require('googleapis');
const Downloader = require('youtube-mp3-downloader');

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel() {
  const service = google.youtube('v3');
  const key = 'AIzaSyCbYn3YgN-fgnqs6AG9oNA-zEfoEM_d7C0';

  service.search
    .list({
      key,
      part: 'id,snippet',
      q: 'how you like that',
    })
    .then(({ data }) => {
      const youtube = new Downloader({
        ffmpegPath: '/usr/local/bin/ffmpeg',
        outputPath: '.',
        youtubeVideoQuality: 'highest',
      });

      youtube.download(data.items[0].id.videoId, 'test.mp3');

      youtube.on('error', (error) => {
        console.error(error);
        process.exit(1);
      });

      youtube.on('finished', () => {
        console.info('Done!');
      });
    })
    .catch(console.error);
}

getChannel();
