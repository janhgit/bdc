var Discogs = require('disconnect').Client;
var col = new Discogs().user().collection();
// Authenticate by user token
const discogsSchema = require('../../db/discogs')
const discgosConfig = require("./discogsconfig.json")
var dis = new Discogs({userToken: discgosConfig.token});
var dis = new Discogs({
	consumerKey: discgosConfig['Consumer-Key'], 
	consumerSecret: discgosConfig.ConsumerSecret
});

const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class DisccollectionCommand extends BaseCommand {
  constructor() {
    super('disccollection', 'discogs', []);
  }

 async run(client, message, args) {
  console.log(discgosConfig.token)
  
    const username = message.mentions.users.first() || message.author
    discogsSchema.findById(username.id)
    .then(res => {
      if(!res){
        return message.channel.send("Looks like you dont have a username set. please run ,discset <username> ")
      }
      console.log(res.discname)
      const discname = res.discname
      col.getReleases(res.discname, 0, {page: 1, per_page: 75}, function(err, data){
        console.log(data)
        let res = ``
        if(!data){
          return
        }


        // for (let i = 0; i < data.releases.length; i++) {
        //   const element = data.releases[i].basic_information.title;
        //   const element_too = data.releases[i].basic_information.resource_url;
        //   const artist = data.releases[i].basic_information.artists[0].name
       
         
        //   res += `**${i + 1}** :[${element}](${element_too}) - _${artist}_\n`
        // }
        // let avatar = username.displayAvatarURL({ dynamic: true })
        
       
        // message.channel.send({embed:{
        //   author: {
        //     name: `${discname}s collection'`,
        //     url: `https://www.discogs.com/user/${discname}/collection`,
        //     icon_url: avatar
        //   },
          
        //   description: res,

        // }})
        
      });
      
    })
    
  }
}