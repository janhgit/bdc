const axios = require('axios');
const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const loveschema = require('../../db/loveemote')
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

        if (!res) {
          message.channel.stopTyping();
          return message.channel.send({
            embed: {
              title: "looks like you are not logged in ",
              description: "please run ,fmlogin to login"
            }
          })

        }
        const fmusername = res.fmusername

        const npurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmusername}&api_key=${lfmconfig.apikey}&extended=1&format=json`
        axios
          .get(npurl)
          .then((response) => {

            const resbase = response.data.recenttracks.track[0]
            // console.log(resbase)
            const items = {
              image: resbase.image[3]['#text'],
              url: resbase.url,
              name: resbase.name,
              loved: resbase.loved,
              artist: resbase.artist.name,
              album: resbase.album['#text'],
              // np: resbase['@attr'].nowplaying
            }
            module.exports = { items, fmusername }


            // const req = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lfmconfig.apikey}&artist=${items.artist}&track=${items.name}&username=${fmusername}&format=json`
            let plays = ``
            let trackPlays = ``
            console.table(items)
            const req = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lfmconfig.apikey}&artist=${items.artist}&track=${items.name}&username=${fmusername}&format=json`
            console.log(req)
            axios
              .get(req)
              .then(r => {
                console.log(r.data)
                // let base = `| ${r.data.track.userplaycount} Track Plays`
                // console.log(base)
                // plays += base
                let love = ``
                let trackPlays = ``
                if (res.track == "true") {
                  trackPlays = `| ${r.data.track.userplaycount} Track Plays`
                    console.log("inside")
                }
                if(res.track == "false"){
                  trackPlays = ""
                }

                console.log(trackPlays)
                message.channel.stopTyping();
                loveschema.findById(username.id)
                  .then((r) => {
                    if (items.loved > 0) {
                      if (!r) {
                        love = "|💞 Loved track"
                      }
                      if (r) {
                        love = `| ${r.emote} Loved track`

                      }
                    }
                    else {
                      love = ""
                    }
                    const playount = response.data.recenttracks['@attr'].total
                    let artist = response.data.recenttracks.track[0].artist.name
                    let member = message.mentions.users.first() || message.author
                    let avatar = member.displayAvatarURL({ dynamic: true })
                    message.channel.send({
                      embed: {
                        color: res.colour || '36393F',
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
                        text: ` ${username.username} has ${playount} total scrobbles ${love} ${trackPlays} `,

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




            console.log(plays)



          })


      })
  }
}