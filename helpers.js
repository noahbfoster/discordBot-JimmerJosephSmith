const admins = ["282614964840169472", "191086797126762496", "832731781231804447"] // these are strings as a workaround. includes() didn't work on the integers. weird, right?


function isAdmin(user) {
    if (admins.includes(""+user.id)) {
      return true;
    } else {
      return false;
    }
}

async function returnAdmins(interaction) {
    var adminNames = []
    for (const admin of admins) {
        await interaction.client.users.fetch(admin).then((user)=> {
            adminNames.push(user.username)
        })
    }
    return adminNames
}


exports.isAdmin = isAdmin
exports.returnAdmins = returnAdmins