const Discord = require("discord.js")
const config = require('./config.json')
const fs = require('node:fs');
const path = require('node:path');


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

client.buttons = new Discord.Collection();
const buttonsPath = path.join(__dirname, 'buttons')
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))
console.log(buttonsPath)

for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const button = require(filePath);
    client.buttons.set(button.data.name, button);
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
        console.log("error in interactionCreate of index.js")
        console.error(error);
        await interaction.reply({content: 'There was an error while exectuing this command!', ephemeral: true});
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId)

    if (!button) return;

    try{
        await button.execute(interaction);
    } catch (error) {
        console.error(error)
        await interaction.reply({content: 'There was an error while executing this button operation!', ephemeral: true});
    }

    //console.log(interaction)
})

client.on("messageCreate", async msg => {
    if (msg.content.includes("Yurtle")||msg.content.includes("yurtle")||msg.content.includes("turtle")||msg.content.includes("Turtle")) {
        const attachment = new Discord.MessageAttachment("./images/Yurtle.png")
        msg.channel.send({files: [attachment]})
    }



});




client.login(config.token);