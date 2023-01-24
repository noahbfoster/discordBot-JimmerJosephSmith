const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('silentroll')
        .setDescription('Roll a dice of a given size silently')
        .addIntegerOption(option => option.setName('dice').setDescription('a number representing the number of sides on the dice')),
    async execute(interaction) {
        let dice = interaction.options.getInteger('dice')
        if (dice == null) {
            messageText = "You did not enter a number for the sides of the dice"
        } else {
            roll = Math.floor(Math.random()*dice) + 1
            messageText = "You rolled a "+roll+" on a d"+dice;
        }
        interaction.reply({content: messageText, ephemeral: true});
    }
}