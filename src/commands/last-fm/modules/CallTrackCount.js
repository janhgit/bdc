const { default: axios } = require('axios');
const data = require('../FmnpCommand');
const u = data.fmusername
const a = data.items.artist 
const t = data.items.name
const lfmconfig = require('../lfmconfig.json')
async function callTrack(username , track , artist ){
    console.log(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lfmconfig.apikey}&artist=${artist}&track=${track}}&username=${username}&format=json`)
    axios
    .get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lfmconfig.apikey}&artist=${artist}&track=${track}&username=${username}&format=json`)
    .then(r => {
        // console.log(r.data)
        const base = r.data.track.userplaycount
        // console.log(base)
        return base
       
    })
    
}
// console.log(base)
module.exports = callTrack(u, t, a)