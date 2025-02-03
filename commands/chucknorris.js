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
            var categories = ["animal","career","celebrity","dev","fashion","food","history","money","movie","music","political","religion","science","sport","travel"] // 'explicit' category is the only one missing.
            var category = categories[Math.floor(Math.random()*categories.length-1)] // pick a category randomly from the list
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
            const json = await response.json()
            await interaction.reply(json.value)
        } catch (error) { // if you get here, something has gone wrong. Probably with the API
            console.log(error)
            interaction.reply("problems occurred.")
        }
    }
}