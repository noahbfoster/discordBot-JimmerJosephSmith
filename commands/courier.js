const { SlashCommandBuilder } = require('@discordjs/builders');
const { DefaultUserAgent } = require('@discordjs/rest');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('courier')
        .setDescription('Sends a letter to the specified user.')
        .addUserOption(option => option.setName('target').setDescription('the target user'))
        .addStringOption(option => option.setName('message').setDescription('the message you are sending')),
    async execute(interaction) {
        const user = interaction.options.getUser('target')
        const message = interaction.options.getString('message')
        var reply = ""
        try {
            await courier(user, interaction.user, message)
            reply = "Sending message to "+user.username
        } catch (e) {
            // console.log(e)
            if (e.message == "MaxLength") {
                reply = "Your message was too long"
            } else {
                reply = "An error occurred"
            }
        }
        interaction.reply(reply)
    }
}

async function courier(user, from, message) {
    messageToSend = "I've been looking for you. Got something I'm supposed to deliver, your hands only...\n\n" + "*A letter from " + from.username +":*\n```" + message + "```" 
    if (messageToSend.length > 2000) {
        // from.send("Your message was too long and failed to send")
        throw(
            new Error("MaxLength")
        );
    } else {
        user.send(messageToSend)
        console.log("Sending to "+user.username+"from "+ from.username + ": "+messageToSend)
    }
}