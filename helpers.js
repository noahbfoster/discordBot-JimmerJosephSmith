//const config = require('./config.json')
//const admins = config.admins
const fs = require('fs');

// this function checks if a user is an admin and returns a boolean
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

// this function returns all admins in an array.
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

// this function is for generating a loading bar of a given size and progress amount
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

// this function is for having the code wait for a given number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// export it all!!!
exports.isAdmin = isAdmin
exports.returnAdmins = returnAdmins
exports.loadingBar = loadingBar
exports.sleep = sleep