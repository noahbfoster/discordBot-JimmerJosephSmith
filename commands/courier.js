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
            // run the courier function, setting the reply assuming success, which will be overwritten in the case of a catch.
            await courier(user, interaction.user, message)
            reply = "Sending message to "+user.username
        } catch (e) {
            // handle errors, setting the proper reply if one occurs
            if (e.message == "MaxLength") {
                reply = "Your message was too long"
            } else {
                reply = "An error occurred"
            }
        }
        // send the reply
        interaction.reply(reply)
    }
}

async function courier(user, from, message) {
    messageToSend = "I've been looking for you. Got something I'm supposed to deliver, your hands only...\n\n" + "*A letter from " + from.username +":*\n```" + message + "```" 
    if (messageToSend.length > 2000) {
        // message is too long, so throw a max length exception
        throw(
            new Error("MaxLength")
        );
    } else {
        // send the message
        user.send(messageToSend)
        console.log("Sending to "+user.username+"from "+ from.username + ": "+messageToSend)
    }
}