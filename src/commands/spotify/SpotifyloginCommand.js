const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SpotifyloginCommand extends BaseCommand {
  constructor() {
    super('spotifylogin', 'spotify', []);
  }

  async run(client, message, args) {
    const querystring = require('qs')
    const randomstring = require('randomstring')
    var client_id = '423bf0474c444ec692aa6a07cd592109';
    var redirect_uri = 'http://localhost:3000/callback';
    const mongoose = require('mongoose');
    const string = randomstring.generate(10)
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();

    var state = message.author.id
    // var state = randomstring.generate(16);
    var scope = 'user-read-currently-playing';
  

    message.channel.send('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      
      }))
  }
}