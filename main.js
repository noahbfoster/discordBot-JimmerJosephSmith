const Discord = require("discord.js")
const PasswordMaker = require("./passwordMaker.js")
var randomWords = require('random-words');
var catFacts = require('./cat-facts.json');
const config = require('./config.json')

var currentVote = []
var voteResults = []
var alreadyVoted = {}
var voteOngoing = false
var prefix = "."
var admins = ["282614964840169472", "191086797126762496", "832731781231804447"] // these are strings as a workaround. includes() didn't work on the integers. weird, right?

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] })



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("Type .jimmerhelp for a list of commands")
})

function isAdmin(user) {
  //console.log("admincheckrun")
  //console.log(user.id)
  if (admins.includes(""+user.id)) {
    //console.log("true")
    return true;
  } else {
    //console.log("false")
    return false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function annoy(user, i, numMessages) {
  if (i<numMessages) {
    sleep(Math.floor(10000+Math.random()*30000)).then(()=>{
      message = catFacts[Math.floor(Math.random()*catFacts.length)]
      console.log("Sending to "+user.username+": "+message)
      //message = randomWords()+" is to "+randomWords()+" as "+randomWords()+" is to "+randomWords(); // old code to generate annoyances using random-words.js
      user.send(message)
      annoy(user, i+1, numMessages)
    })
  }
}

//"██████░░░░░░"
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



client.on("messageCreate", async msg => {
  switch (msg.content) {
    case "ping":
      msg.reply("pong")
      break
    case ".mute AJ":
      //console.log(msg.author.id)
      if (msg.author.id==832731781231804447 || isAdmin(msg.author.id)) {
        let AJ = await msg.guild.members.fetch("256180684757008386")
        try { 
          if (AJ.voice.mute) {
            await AJ.edit({mute: false})
            msg.reply("You have been pardoned.")
          } else {
            await AJ.edit({mute: true})
            msg.reply("Get Muted, Son")
          }
        } catch (error) {
          console.log("______________________________________")
          console.log(error)
          console.log("______________________________________")
        }

      

      }
      break;
    case ".generate":
      msg.author.send("Random Pronounceable Password: " + PasswordMaker.wordoidPasswordGenerator())
      msg.author.send("Random Password: " + PasswordMaker.getRandomPassword(12))
      msg.author.send("Random English Word based Password: " + PasswordMaker.dictionaryPasswordGenerator(8))
      msg.reply("Passwords Generated. Check your DMs.")
      break;

    case ".jimmerhelp":
      {
        let toSend = ""
        toSend+=("Commands:")
        toSend+=("\n.generate: sends three randomly generated passwords of different types to your DMs")
        toSend+=("\n.vote #: votes for option # if there is an ongoing vote.")
        toSend+=("\n.tarkovmappicker: will return a random tarkov map")
        toSend+=("\n.8ball question(optional): gives you a response as from a magic 8 ball")
        msg.author.send(toSend)
        if (isAdmin(msg.author)) {
          toSend="You are an admin! Here are the admin commands:"
          toSend+="\n.annoy @user @user2...: annoys any number of users you mention directly in the channel by sending 10 random facts about cats to their DMs in 10-40 second intervals."
          toSend+="\n.setupvote|(prompt)|(choice 1)|...|(choice n): sets up a vote including the prompt and n arbitrary number of choices, if a vote is not ongoing"
          toSend+="\n.endvote: ends the ongoing vote, and sends the results to the channel you ended the vote in."
          msg.author.send(toSend)
        }
        msg.reply("Commands list was sent to your DMs.")
      }

      break;
    case ".bartest":
      msg.channel.send("Loading bar test:")
      msg.channel.send(loadingBar(Math.random(),20))
      break;
    case ".endvote":
      if (isAdmin(msg.author)&&currentVote.length>0&&voteOngoing) {
        let toSend = ""
        toSend+=("Vote has ended")
        toSend+=("\nVote results:")
        toSend+=("\nPrompt: "+currentVote[0])
        let i=1
        let totalVotes = 0
        voteResults.forEach(element => {totalVotes+=element})
        //console.log("totalVotes: "+totalVotes)
        if (totalVotes==0) {
          totalVotes=1
          console.log("Oh cmon guys, no votes?")
        }
        while (i<currentVote.length) {
          toSend+=("\n"+currentVote[i])
          //console.log(voteResults[i-1]/totalVotes)
          toSend+=("\n"+loadingBar(voteResults[i-1]/totalVotes,20))
          i++
        }
        msg.channel.send(toSend)
        //console.log(voteResults)
        voteOngoing=false
      } else {
        msg.reply("no vote is currently ongoing or you don't have permission")
      }
      break;
    case ".newlinetest":
      msg.reply("test\ntest")
      break;
    case ".tarkovmappicker":
      {
        let maps = ['Customs','Factory','Shoreline','Labs','Reserve','Lighthouse','Woods','Interchange']
        let choice = maps[Math.floor(Math.random()*maps.length)]
        msg.reply("Map choice: "+choice)
        break;
      }

      

    
      
  }
  if (msg.content.startsWith(".annoy") && isAdmin(msg.author)) {
    msg.mentions.users.forEach(user => {
      console.log("Annoying "+user.username)
      msg.channel.send("Annoying "+user.username)
      annoy(user, 0, 10)
    });
  }
  if (msg.content.includes("Yurtle")||msg.content.includes("yurtle")||msg.content.includes("turtle")||msg.content.includes("Turtle")) {
    const attachment = new Discord.MessageAttachment("./images/Yurtle.png")
    msg.channel.send({files: [attachment]})
  }
  if (msg.content.startsWith(".setupvote")&&isAdmin(msg.author)) {
    if (!voteOngoing) {
      currentVote = msg.content.split("|").slice(1)
      console.log("New Vote:")
      console.log(currentVote)
      let i = 0
      voteResults = []
      alreadyVoted = {}
      while (i<(currentVote.length-1)) {
        voteResults.push(0)
        i++
      }
      //console.log(voteResults)
      voteOngoing=true
      
      let toSend = ""
      toSend+="A new vote has begun! Use '.vote #' to vote for your option number choice."
      toSend+=("\nPrompt: "+currentVote[0])
      i=1
      while (i<(currentVote.length)) {
        toSend+=("\nOption "+i+": "+currentVote[i])
        i++
      }
      msg.channel.send(toSend)
    } else {msg.reply("Vote is currently ongoing. Run .endvote to end the current vote.")}
  }
  if (msg.content.startsWith(".vote")) {
    if (voteOngoing){
      let arr = msg.content.split(" ")
      let num = parseInt(arr[1])
      if (num<=voteResults.length) {
        if (alreadyVoted[''+msg.author.id]) {
          msg.reply("You already voted, chief.")
        } else {
          voteResults[num-1] = voteResults[num-1]+1
          alreadyVoted[''+msg.author.id] = true
          console.log("someone voted for "+num)
        }
      } else {
        msg.reply("Bud, what happened? You done messed up. You tryna screw my code over? Input a valid number next time. You are free to go.")
      }
      
    } else {
      msg.reply("No vote is currently ongoing")
    }
  }
  if (msg.content.startsWith(".8ball")) {
    {
      let responses = ['It is certain.','It is decidedly so.','Without a doubt.','Yes definitely.','You may rely on it.','As I see it, yes.','Most likely.','Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', "Don't count on it.", 'My reply is no.', 'My sources say no.', "Outlook not so good.", "Very doubtful."]
      let choice = responses[Math.floor(Math.random()*responses.length)]
      msg.reply(choice)
    }
    
  }
  

})


// Look into this https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files

client.login(config.token)
