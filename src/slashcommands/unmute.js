const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'unmute', // required
  description: 'unmute someone', // required
  permissions: 'MUTE_MEMBERS', // not required
  cooldown: 30,
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 'USER'
    }
  ],
  run: async function(client, interaction, args) {

    let member = interaction.guild.members.cache.get(args[0]);

    if (!member) return interaction.followUp(`${client.emotes.error} I can\'t find this member`)

    if (!interaction.guild.me.permissions.has('MUTE_MEMBERS')) return interaction.followUp(`${client.emotes.error} I don\'t have \`MUTE_MEMBERS\` permission`)
      .then(() => {
        setTimeout(() => {
          interaction.deletefollowUp()
        }, 5000)
      })

    let mute_role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted');

    if (!mute_role) {
      await interaction.guild.roles.create({
        name: 'Muted',
        permissions: [],
        reason: 'Mute role'
      })
    }

    if (!member.roles.cache.get(mute_role.id)) return interaction.followUp(`${client.emotes.error} This member isn\'t muted`)

    member.roles.remove(mute_role)
      .then(() => {
        interaction.followUp(`${member} Is now unmuted 😀`)
      })
      .catch(() => {
        interaction.followUp(`${client.emotes.error} I can\'t unmute this member`);
      })
  }
}