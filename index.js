const Discord = require("discord.js")
const config = require('./config.json')

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] })

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity("Type .jimmerhelp for a list of commands")
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!')
    } else if (commandName === 'beep') {
        await interaction.reply('Boop!')
    }
})

client.login(config.token);