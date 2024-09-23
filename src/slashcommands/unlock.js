const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'unlock',
  description: 'unlock Channel!',
  permissions: 'MANAGE_CHANNELS',
  cooldown: 5,
  options: [
    {
      name: 'channel',
      description: 'the targeted channel',
      type: 'CHANNEL'
    }
  ],
  run: async function(client, interaction, args) {

    if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS')) return interaction.followUp(`${client.emotes.error} I don\'t have \`MANAGE_CHANNELS\` permission`)

    let channel = interaction.guild.channels.cache.get(args[0]) || interaction.channel;

    channel.permissionOverwrites.edit(interaction.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {

      interaction.followUp(`${client.emotes.success} Now, all body can write in this channel`);

    }).catch(() => {

      interaction.followUp(`${client.emotes.error} I can\'t unlock this channel`);

    })

  }
}