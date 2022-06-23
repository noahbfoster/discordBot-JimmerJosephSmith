const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tarkovmappicker')
        .setDescription('Randomly picks a tarkov map!'),
    async execute(interaction) {
        let maps = ['Customs','Factory','Shoreline','Labs','Reserve','Lighthouse','Woods','Interchange']
        let choice = maps[Math.floor(Math.random()*maps.length)]
        // msg.reply("Map choice: "+choice)
        return interaction.reply("Map choice: "+choice)
    }
}