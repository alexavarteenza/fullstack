const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bot',
  description: 'View bot info',
  cooldown: 5,
  run: async function(client, interaction, args) {
    const row = new MessageActionRow()

      .addComponents(
        new MessageButton()
          .setEmoji('🤖')
          .setLabel('Invite')
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands+bot`)
          .setStyle('LINK'),
      )
      .addComponents(
        new MessageButton()
          .setEmoji('❔')
          .setLabel('Support')
          .setURL('https://discord.gg/ZXkNK2FTfs')
          .setStyle('LINK'),
      )

    const embed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(`
      - Ping \`${client.ws.ping}\`
      - Servers \`${client.guilds.cache.size}\`
      - Channels \`${client.channels.cache.size}\`
      - Users \`${client.users.cache.size}\`
      `)
      .setColor('BLUE')

    await interaction.followUp({ embeds: [embed], components: [row] })

  }
}