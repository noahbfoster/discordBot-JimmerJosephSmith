const { SlashCommandBuilder } = require('@discordjs/builders');
const { spawn } = require('node:child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scriptrun')
		.setDescription('Wouldn\'t you like to know, Weather boy'),
	async execute(interaction) {
        var replyText = "Performing Calculation...";
        await interaction.reply(replyText);
		const bat = spawn('cmd.exe', ['/c', 'my.bat']);
        bat.stdout.on('data', (data) => {
            var dataString = data.toString() 
            console.log(dataString);
            replyText += "\n";
            replyText += dataString;
            interaction.editReply(replyText)
        })

        bat.stderr.on('data', (data) => {
            var dataString = data.toString() 
            console.log(dataString);
            replyText += "\n";
            replyText += dataString;
            interaction.editReply(replyText)
        })

        bat.on('exit', (code) => {
            console.log(`child exited with code ${code}`);
            replyText += "\n";
            replyText += `child exited with code ${code}`;
            interaction.editReply(replyText)
        })
        
        // interaction.reply(replyText)
	},
};