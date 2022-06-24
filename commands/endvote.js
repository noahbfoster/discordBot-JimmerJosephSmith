const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js')
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('endvote')
        .setDescription('Ends the ongoing vote'),
    async execute(interaction) {
        var vote;
        if (helpers.isAdmin(interaction.member)) {
            try {
                //vote = await require('../storage/vote.json')
                let voteData = fs.readFileSync('./storage/vote.json')
                vote = JSON.parse(voteData)
            } catch {
                interaction.reply("no vote was ongoing or it was erased.")
                return
            }
            //console.log(vote)
            if(vote.ongoing==false) {
                interaction.reply("No ongoing vote!")
                return
            }
            let toSend = ""
            toSend+=("Vote has ended")
            toSend+=("\nVote results:")
            toSend+=("\nPrompt: "+vote.currentVote[0])
            let i=1
            let totalVotes = 0
            vote.voteResults.forEach(element => {totalVotes+=element})
            if (totalVotes==0) {
                totalVotes=1
                //console.log("Oh cmon guys, no votes?")
                var voteObject = {"ongoing":false,"currentVote":vote.currentVote,"voteResults":vote.voteResults,"alreadyVoted":vote.alreadyVoted}
                var voteString = JSON.stringify(voteObject)
                await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
                interaction.reply("No one voted!")
                return
            }
            while (i<vote.currentVote.length) {
                toSend+=("\n"+vote.currentVote[i])
                //console.log(voteResults[i-1]/totalVotes)
                toSend+=("\n"+helpers.loadingBar(vote.voteResults[i-1]/totalVotes,20))
                i++
            }
            var voteObject = {"ongoing":false,"currentVote":vote.currentVote,"voteResults":vote.voteResults,"alreadyVoted":vote.alreadyVoted}
            var voteString = JSON.stringify(voteObject)
            await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
            interaction.reply(toSend)
        } else {
            interaction.reply("Only admins can end votes! do /adminlist to see the list of admins.")
        }
    }
}