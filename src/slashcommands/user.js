const { MessageEmbed } = require('discord.js')
const moment = require("moment");

module.exports = {
  name: 'user',
  description: 'Get a member information',
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

      .setAuthor(`Information about ${user.user.tag}`, user.user.avatarURL({ dynamic: true }))

      .setColor('BLUE')

      .setThumbnail(user.user.avatarURL({ dynamic: true }))

      .addField('Created At',
        `\`${moment(user.user.createdAt).format('YYYY/M/D h:mm:ss')}\`
      **${moment(user.user.createdAt).fromNow()}**`, true)

      .addField('Joined At',
        `\`${moment(user.joinedAt).format('YYYY/M/D h:mm:ss')}\`
      **${moment(user.joinedAt).fromNow()}**`, true)

      .setFooter(`${user.id}`, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelRgeVqQfznBpBp2WfnUecMn2Oga54VltAQ&usqp=CAU')

    await interaction.followUp({ embeds: [embed] })

  }
}