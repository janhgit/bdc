const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const axios = require('axios');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FminfoCommand extends BaseCommand {
  constructor() {
    super('fminfo', 'last-fm', []);
  }

  run(client, message, args) {
    const username = message.mentions.users.first() || message.author
    loginschema.findById(username.id)
    .then((res) => {
      const fmusername = res.fmusername
      axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${res.fmusername}&api_key=${lfmconfig.apikey}&format=json`)
      .then((response) => {
        let member = message.mentions.users.first() || message.author
        let avatar = member.displayAvatarURL({ dynamic: true })
        message.channel.send({embed : {
          color: '36393F',
          author: {
            name: `Last.fm Info for ${member.username}`,
            url: `https://www.last.fm/user/${fmusername}`,
            icon_url: avatar
          },
          description: `Username : **${response.data.user.name}** \n Real Name : **${response.data.user.realname}** \n Gender : **${response.data.user.gender}** `,
          thumbnail: {
            url: response.data.user.image[3]['#text']
          },
          footer: {
            text: ` ${member.username} has ${response.data.user.playcount} scrobbles`,
            
          },
          timestamp: Date.now()
        }})
      })
    })
  
  }
}