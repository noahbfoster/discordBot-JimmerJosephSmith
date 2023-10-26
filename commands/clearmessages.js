const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

// Haphazardly constructed command for the purpose of deleting the last x messages in a channel. Requires the bot to have administrator permission to the server. This is a dangerous command. Use with caution.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearmessages')
        .setDescription('Clear the last set number of messages in the channel.')
        .addNumberOption(option => option.setName('number').setDescription('Number of messages to delete. Default: 1')),
    async execute(interaction) {
        if (helpers.isAdmin(interaction.member)!=true) { // checks if the user is an admin
            interaction.reply("Only admins can delete messages. do /adminlist to see the list of admins")
            return
        }

        let number = interaction.options.getNumber('number')
        if (number == null) {number = 1};
        if (number > 100) { // prevents this command from being used on more than 100 messages at a time
            var messageText = "Cannot delete more than 100 messages."
            interaction.reply({content: messageText, ephemeral: true})
            return
        }
        let channelId = interaction.channelId

        var messages;
        try { // attempts to fetch the messages.
            messages = await interaction.channel.messages.fetch({ limit: number, cache: false })
        } catch (error) {
            console.error
            var messageText = "Error Occurred. Remember to turn on admin permission for the bot temporarily. "+error
            interaction.reply({content: messageText, ephemeral: true})
            return
        }


        try { // attempts to delete the messages.
            interaction.deferReply({ ephemeral: true }); // defers the reply in case the command takes longer than 3 seconds.
            for (const each of messages) {
                //console.log(each[1].id);
                await interaction.channel.messages.delete(each[1].id)
            }
        } catch (error) {
            console.error
            var messageText = "Error Occurred. Remember to turn on admin permission for the bot temporarily. "+error
            interaction.editReply({content: messageText, ephemeral: true})
            return
        }
        //console.log(messages);


        // send ephemeral message confirming command went through. Messages are still probably being deleted since this is asynchronous.
        var messageText = "Cleared "+number+" messages."
        interaction.editReply({content: messageText, ephemeral: true})
    }
}