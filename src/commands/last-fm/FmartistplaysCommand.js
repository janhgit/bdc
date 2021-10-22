const axios = require('axios');
const lfmconfig = require('./lfmconfig.json')
const schema = require('../../db/login');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FmartistplaysCommand extends BaseCommand {
  constructor() {
    super('fmartistplays', 'last-fm', ['fmap']);
  }

 async run(client, message, args) {
    const username = message.mentions.users.first() || message.author
    schema.findById(username.id)
    .then((res)=> {
      if(!res){
        return message.channel.send({embed :{
          title: "looks like you are not logged in ",
          description: "please run ,fmlogin to login"
        }})
      }
      const fmname = res.fmusername
      const npurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmname}&api_key=${lfmconfig.apikey}&extended=1&format=json`
      axios
      .get(npurl)
      .then(response => {
        const artist = response.data.recenttracks.track[0].artist.name

        axios
      .get(`http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artist}&username=${fmname}&api_key=${lfmconfig.apikey}&format=json`)
      .then(res => {
        console.log(res.data.artist.stats.userplaycount)
        if(!res.data.artist.stats.userplaycount){
          return message.channel.send("looks like you don't have plays on that artist")
        }
        message.channel.send(`**${username.username}** has **${res.data.artist.stats.userplaycount}** scrobbles on **${artist}**`)
      })
      })


    } )
    
  }
}