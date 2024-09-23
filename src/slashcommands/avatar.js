const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'avatar',
  description: 'Get a member avatar',
  cooldown: 5,
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 'USER'
    }
  ],
  run: async function(client, interaction, args) {

    let user = interaction.guild.members.cache.get(args[0]) || interaction.member;

    let embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(interaction.user.tag, interaction.user.avatarURL({ dynamic: true }))
      .setImage(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle(`${user.user.username}`)
      .setURL(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))

    await interaction.followUp({ embeds: [embed] })

  }
}
