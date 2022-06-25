const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const delay = Date.now() - interaction.createdAt
		return interaction.reply(`**Pong!** *(delay: ${delay}ms)*`);
	},
};