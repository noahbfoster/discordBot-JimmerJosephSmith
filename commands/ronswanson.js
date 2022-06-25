const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const {fetch} = require('cross-fetch')
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ronswanson')
        .setDescription('get a random ron swanson quote and post it'),
    async execute(interaction) {
        try {
            const response = await fetch(`https://ron-swanson-quotes.herokuapp.com/v2/quotes`)
            const json = await response.json()
            await interaction.reply(json[0])
        } catch (error) {
            console.log(error)
            interaction.reply("problems occurred.")
        }
    }
}