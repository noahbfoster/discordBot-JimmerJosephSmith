//const config = require('./config.json')
//const admins = ["282614964840169472", "191086797126762496", "832731781231804447"] // these are strings as a workaround. includes() didn't work on the integers. weird, right?
//const admins = config.admins
const fs = require('fs');

function isAdmin(user) {
  var admins;
  var config
  try {
    let rawData = fs.readFileSync('config.json')
    config = JSON.parse(rawData)
    admins = config.admins
  } catch {
    console.log("SHNIKEY, error, helpers line 13")

    return
  }
  if (admins.includes(""+user.id)) {
    return true;
  } else {
    return false;
  }
}

async function returnAdmins(interaction) {
    var admins;
    var config
    try {
      let rawData = fs.readFileSync('config.json')
      config = JSON.parse(rawData)
      admins = config.admins
    } catch (error) {
      console.log(error)
      console.log("SHNIKEY")
      return "uh, something has gone horribly wrong"
    }
    var adminNames = []
    for (const admin of admins) {
        await interaction.client.users.fetch(admin).then((user)=> {
            adminNames.push(user.username)
        })
    }
    return adminNames
}

function loadingBar(progress, size) {
  let bar = "|"
  let j = Math.ceil(progress*size)
  let k = Math.floor(size-j)
  let i = 0
  while (i<j) {
    bar+="█"
    i++
  }
  i=0
  while (i<k) {
    bar+="░"
    i++
  }
  bar=bar+"|  "+Math.round(progress*10000)/100+"%"
  return bar
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




exports.isAdmin = isAdmin
exports.returnAdmins = returnAdmins
exports.loadingBar = loadingBar
exports.sleep = sleep