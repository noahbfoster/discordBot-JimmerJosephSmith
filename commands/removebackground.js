const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removebackground')
        .setDescription('removes image background')
        .addAttachmentOption(option => option.setName('image').setDescription('image to remove background from')),
    async execute(interaction) {
        let image = interaction.options.getAttachment('image')
        let toSend = "test"

        try {
            
        } catch (error) {
            
        }


        const attachment = new Discord.MessageAttachment(image.proxyURL)
        await interaction.reply({content: toSend, files: [attachment]})
    }
}