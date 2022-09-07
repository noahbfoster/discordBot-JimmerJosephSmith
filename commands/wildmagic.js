const { SlashCommandBuilder } = require('@discordjs/builders');
var wildMagicTable = require('../wildmagic.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wildmagic')
        .setDescription('Rolls on the Wild Magic Table'),
    async execute(interaction) {
        randomIndex = Math.floor(Math.random()*wildMagicTable.length)
        d100Roll = randomIndex + 1;
        messageText = "You rolled a "+d100Roll+". The effect of that roll is: "+wildMagicTable[randomIndex] + ".";
        interaction.reply({content: messageText, ephemeral: true});
    }
}
