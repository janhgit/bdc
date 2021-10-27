const BaseCommand = require('../../utils/structures/BaseCommand');
const schema = require('../../db/login');
const lfmconfig = require('./lfmconfig');
const { default: axios } = require('axios');
const set = new Set();

module.exports = class FmwhoknowsCommand extends BaseCommand {
  constructor() {
    super('fmwhoknows', 'last-fm', ['fmwk']);
  }

  async run(client, message, args) {
    const guildID = message.guild.id
    const Guild = client.guilds.cache.get(guildID); // Getting the guild.
    const Members = Guild.members.cache.map(member => member.id); // Getting the members and mapping them by ID.
    let fmnames = ``
    let GuildUserIds = ``
   
    schema.find({ _id: Members }, "fmusername").then((p) => {
      for (let i = 0; i < p.length; i++) {
        fmnames += `${p[i].fmusername},`;
      }
      const test = fmnames.split(",")
     
      for (let i = 0; i < test.length; i++) {
        const element = test[i];
        let response = ``
        const request_url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Frank%20Ocean&api_key=${lfmconfig.apikey}&username=${element}&format=json`
        axios
          .get(request_url)
          .then(res => {
            // console.log(element, ":", res.data.artist.stats.userplaycount)
            response += ` **${element} - ${res.data.artist.stats.userplaycount}**`
            
            set.add(response);

          })
      }

      console.log(set)
    });
    



  }
}


