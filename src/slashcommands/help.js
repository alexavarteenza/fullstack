const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'View all bot commands',
  cooldown: 10,
  run: async function(client, interaction, args) {
    
    let i = 1
    let commands = client.commands.map(cmd => `__${i++}__ - **/${cmd.name}** > \`${cmd.description}\``)

    const embed = new MessageEmbed()
      .setAuthor(`${client.user.tag} help list`, client.user.avatarURL())
      .setDescription(`${commands.join('\n')}`)
      .setColor('BLUE')


    await interaction.followUp({ embeds: [embed] })
    
  },
};
