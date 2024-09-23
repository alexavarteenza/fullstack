const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'hide',
  description: 'Hide a channel',
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

    if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS')) return interaction.followUp(`${client.emotes.no} I don\'t have \`MANAGE_CHANNELS\` permission`)

    let channel = interaction.guild.channels.cache.get(args[0]) || interaction.channel;

    channel.permissionOverwrites.edit(interaction.guild.id, {
      VIEW_CHANNEL: false
    }).then(() => {

      interaction.followUp(`${client.emotes.success} Now, no body an\ see this channel`);

    }).catch(() => {

      interaction.followUp(`${client.emotes.no} I can\'t hide this channel`);

    })

  }
}