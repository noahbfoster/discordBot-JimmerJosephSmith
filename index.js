const Discord = require("discord.js")
const config = require('./config.json')
const fs = require('node:fs');
const path = require('node:path');

var currentVote = []
var voteResults = []
var alreadyVoted = {}
var voteOngoing = false
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] })

client.commands = new Discord.Collection();
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
console.log(commandsPath)

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity("Type .jimmerhelp for a list of commands")
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try{
        await command.execute(interaction);
    } catch (error) {
        console.log("error on line 32 of index.js")
        console.error(error);
        await interaction.reply({content: 'There was an error while execturing this command!', ephemeral: true});
    }
})





client.login(config.token);