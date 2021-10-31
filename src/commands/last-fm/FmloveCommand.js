const axios = require('axios');
const lfmconfig = require('./lfmconfig.json')
const schema = require('../../db/login');
const BaseCommand = require('../../utils/structures/BaseCommand');
const md5 = require('md5');
module.exports = class FmloveCommand extends BaseCommand {
  constructor() {
    super('fmlove', 'last-fm', ['fml', "fmyeah", "fmfuck"]);//  s/o fmbot :kith:
  }

  async run(client, message, args) {
    const username = message.mentions.users.first() || message.author
    schema.findById(username.id)
      .then((res) => {
        const fmusername = res.fmusername
        if (!res) {
          return message.channel.send({
            embed: {
              title: "looks like you are not logged in ",
              description: "please run ,fmlogin to login"
            }
          })
        }

        const fm = {
          key: lfmconfig.apikey,
          secret: lfmconfig.apisecret,
          sk: res.sk,
          username: res.fmusername
        }

        const npurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fm.username}&api_key=${fm.key}&extended=1&format=json`
        axios
          .get(npurl)
          .then((response) => {
            const resbase = response.data.recenttracks.track[0]
            const res = {
              name: resbase.name,
              artist: resbase.artist.name,
              album: resbase.album['#text']
            }


            const api_sig = md5(`api_key${fm.key}artist${res.artist}methodtrack.lovesk${fm.sk}track${res.name}${fm.secret}`)
            axios({
              method: 'post',
              url: 'http://ws.audioscrobbler.com/2.0/',
              data: `method=track.love&api_key=${fm.key}&artist=${res.artist}&track=${res.name}&api_sig=${api_sig}&sk=${fm.sk}`

            })
              .then(result => {

                const get_image = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lfmconfig.apikey}&artist=${res.artist}&album=${res.album}&format=json`
                axios
                  .get(get_image)
                  .then((r) => {
                  
                    const image = r.data.album.image[3]['#text']
                    const album = r.data.album.name
                    let member = message.mentions.users.first() || message.author
                    let avatar = member.displayAvatarURL({ dynamic: true })
                    return message.channel.send({
                      embed: {
                        color: "77C66E",
                      title: `**${res.name} \n**${res.artist}**  **`,
                        description :  `_${album}_`,
                        author: {
                          name: `Loved track 💞 - ${username.username}`,
                          url: `https://www.last.fm/user/${fmusername}`,
                          icon_url: avatar
                        },
                        thumbnail: {
                          url:image
                        },
                        // timestamp: Date.now()
                      }
                    })
                  })

              })
              .catch(err => {
                console.log('Got an error:', err)
                return message.channel.send(`hmm something went wrong.. This could be a last.fm error. Please try again later`)
              })
          })


      })

  }

}