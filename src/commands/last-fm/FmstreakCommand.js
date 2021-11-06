const BaseCommand = require('../../utils/structures/BaseCommand');
const schema = require('../../db/login');
const lfmconfig = require('./lfmconfig');
const { default: axios } = require('axios');


module.exports = class FmstreakCommand extends BaseCommand {
  constructor() {
    super('fmstreak', 'last-fm', []);
  }

  run(client, message, args) {

    schema.findById(message.author.id)
      .then(r => {
        const fmusername = r.fmusername
        const npurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmusername}&limit=2&api_key=${lfmconfig.apikey}&extended=1&format=json`
        axios
          .get(npurl)
          .then(response => {
            let i = 0
            let a = 1
            console.log(response.data.recenttracks.track[i].artist.name ,response.data.recenttracks.track[a].artist.name )
            for (; response.data.recenttracks.track[i].artist.name == response.data.recenttracks.track[a].artist.name;a++, i++) {
              console.log(i, a)
              
            }
         
            // if( response.data.recenttracks.track[i].artist.name == response.data.recenttracks.track[a].artist.name){
            //   console.log(i)
            // }
            // else{
            //   i++ 
            // }
          	// for (let i = 0; response.data.recenttracks.track[i].artist.name == response.data.recenttracks.track[i++].artist.name; i++) {
              
            //   console.log(i)
              
            // }
          
          })

      })

  }
}