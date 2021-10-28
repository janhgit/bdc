const axios = require('axios');
const lfmconfig = require('./lfmconfig.json')
const schema = require('../../db/login');
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class FmrecentCommand extends BaseCommand {
  constructor() {
    super('fmrecent', 'last-fm', ['fmr']);
  }

  async run(client, message, args) {


    const username = message.mentions.users.first() || message.author
    schema.findById(username.id)
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
        let love = ``
        const npurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmusername}&api_key=${lfmconfig.apikey}&extended=1&format=json`
        let response = ``
        axios
          .get(npurl)
          .then(res => {
            const image = res.data.recenttracks.track[0].image[3]['#text']
            for (let i = 0; i < 5; i++) {
              
              const resbase = res.data.recenttracks.track[i]
              const items = {
                image: resbase.image[3]['#text'],
                url: resbase.url,
                name: resbase.name,
                loved: resbase.loved,
                artist: resbase.artist.name,
                album: resbase.album['#text']
              }
              if (items.loved > 0) {
                love = " | ❤️"
              } else {
                love = ""
              }

              response += `${i + 1} : **[${items.name}](${items.url})** - **${items.artist}**\n _${items.album}_ ${love}\n \n`
            }
            let member = message.mentions.users.first() || message.author
            let avatar = member.displayAvatarURL({ dynamic: true })
           message.channel.send({embed : {
             color: '36393F',
            author: {
              name: `Recent Tracks - ${username.username}`,
              url: `https://www.last.fm/user/${fmusername}`,
              icon_url: avatar
            },
            thumbnail: {
              url: image
            },
             description: response,
           }})
          })
      })



  }
}