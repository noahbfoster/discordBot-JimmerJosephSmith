const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const {fetch} = require('cross-fetch')
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chucknorris')
        .setDescription('get a random chuck norris joke and post it'),
    async execute(interaction) {
        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random`)
            const json = await response.json()
            await interaction.reply(json.value)
        } catch (error) {
            console.log(error)
            interaction.reply("problems occurred.")
        }
    }
}