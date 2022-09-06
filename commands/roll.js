const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice of a given size')
        .addIntegerOption(option => option.setName('dice').setDescription('a number representing the number of sides on the dice')),
    async execute(interaction) {
        let dice = interaction.options.getInteger('dice')
        if (dice == null) {
            interaction.reply("You did not enter a number for the sides of the dice")
        } else {
            roll = Math.floor(Math.random()*dice) + 1
            interaction.reply("You rolled a "+roll+" on a d"+dice)
        }
    }
}