const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js')
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('endvote')
        .setDescription('(Admin only) Ends the ongoing vote'),
    async execute(interaction) {
        var vote;
        
        var guild = interaction.guildId;
        var votefile = './storage/voteguild'+guild+'.json'

        if (helpers.isAdmin(interaction.member)) {
            try { // retrieve the vode data from storage
                let voteData = fs.readFileSync(votefile)
                vote = JSON.parse(voteData)
            } catch {
                interaction.reply("no vote was ongoing or it was erased.")
                return
            }
            //console.log(vote)
            if(vote.ongoing==false) { // vote wasn't still ongoing
                interaction.reply("No ongoing vote!")
                return
            }
            
            // begin writing the message we're going to send
            let toSend = ""
            toSend+=("Vote has ended")
            toSend+=("\nVote results:")
            toSend+=("\nPrompt: "+vote.currentVote[0])
            let i=1
            let totalVotes = 0
            vote.voteResults.forEach(element => {totalVotes+=element})
            if (totalVotes==0) { // nobody voted
                totalVotes=1 // idk why this is here
                //console.log("Oh cmon guys, no votes?")
                var voteObject = {"ongoing":false,"currentVote":vote.currentVote,"voteResults":vote.voteResults,"alreadyVoted":vote.alreadyVoted}
                var voteString = JSON.stringify(voteObject)
                await fs.writeFileSync(votefile, voteString, {flag: "w"})
                interaction.reply("No one voted!")
                return
            }
            while (i<vote.currentVote.length) { // generate loading bars for each voting option
                toSend+=("\n"+vote.currentVote[i])
                //console.log(voteResults[i-1]/totalVotes)
                toSend+=("\n"+helpers.loadingBar(vote.voteResults[i-1]/totalVotes,20))
                i++
            }
            // write to the vote file to indicate the vote is no longer ongoing
            var voteObject = {"ongoing":false,"currentVote":vote.currentVote,"voteResults":vote.voteResults,"alreadyVoted":vote.alreadyVoted}
            var voteString = JSON.stringify(voteObject)
            await fs.writeFileSync(votefile, voteString, {flag: "w"})
            // finally send the message to reveal vote results
            interaction.reply(toSend)
        } else {
            interaction.reply("Only admins can end votes! do /adminlist to see the list of admins.")
        }
    }
}