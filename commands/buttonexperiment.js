const Discord = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttonexperiment')
        .setDescription('an experiment'),
    async execute(interaction) {
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('test')
                    .setLabel('test')
                    .setStyle('PRIMARY'),
            )
        await interaction.reply({content: 'Test Button', components: [row]});
    }
}