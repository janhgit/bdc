const axios = require('axios');
const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const emoteschema = require('../../db/emote')
const BaseCommand = require('../../utils/structures/BaseCommand');
const message = require("discord.js")

module.exports = class FmnpCommand extends BaseCommand {
  constructor() {
    super('fmnp', 'last-fm', ['np', 'fm']);
  }

  async run(client, message, args) {
    message.channel.startTyping();
    let emote1 = ``
  let emote2 = ``
    const username = message.mentions.users.first() || message.author
    emoteschema.findById(username.id)
    
    .then((res) => {
      emote1 += res.emoteOne
      emote2 += res.emoteTwo
    })

    loginschema.findById(username.id)
      .then((res) => {
        message.channel.stopTyping();   
        
        if(!res){
          message.channel.stopTyping();
          return message.channel.send({embed :{
            title: "looks like you are not logged in ",
            description: "please run ,fmlogin to login"
          }})
         
        }
        const fmusername =  res.fmusername
        
        const npurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmusername}&api_key=${lfmconfig.apikey}&extended=1&format=json`
        axios
          .get(npurl)
          .then((res) => {
            
            const resbase = res.data.recenttracks.track[0]
            const items = {
              image: resbase.image[3]['#text'],
              url: resbase.url,
              name: resbase.name,
              loved: resbase.loved,
              artist : resbase.artist.name,
              album : resbase.album['#text']
            }
           
            message.channel.stopTyping();

            const playount = res.data.recenttracks['@attr'].total
            let love = ``
            if (items.loved > 0) {
              love = "|💞Loved Track"
            } else {
              love = ""
            }
            let artist = res.data.recenttracks.track[0].artist.name
            let member = message.mentions.users.first() || message.author
            let avatar = member.displayAvatarURL({ dynamic: true })
            message.channel.send({
              embed: {
                color: '36393F',
                author: {
                  name: `now playing - ${username.username}`,
                  url: `https://www.last.fm/user/${fmusername}`,
                  icon_url: avatar
                },
                title: items.name,
                url: items.url,
                description: `**${items.artist}** - _${items.album}_`,
                thumbnail: {
                  url: items.image
                },
                footer: {
                  text: ` ${username.username} has ${playount} scrobbles ${love}  `,
                  
                },
                timestamp: Date.now()
              } 
            })
            
            .then(function (message) {
              message.react(emote1)
              message.react(emote2)
            })
      })

      
  })
}
}