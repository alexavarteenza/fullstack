const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'mute',
  description: 'mute someone',
  permissions: 'MUTE_MEMBERS',
  cooldown: 30,
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 'USER',
      required: true
    },
    {
      name: 'reason',
      description: 'the mute reason',
      type: 'STRING',
      choices: [
        {
          name: 'سب',
          value: 'سب'
        },
        {
          name: 'قذف',
          value: 'قذف'
        },
        {
          name: 'لعن',
          value: 'لعن'
        },
        {
          name: 'سبام',
          value: 'سبام'
        },
      ]
    },
  ],
  run: async function(client, interaction, args) {

    let member = interaction.guild.members.cache.get(args[0])

    if (!member) return interaction.followUp(`${client.emotes.error} I can\'t find this member`)

    if (!interaction.guild.me.permissions.has('MANAGE_ROLES')) return interaction.followUp(`${client.emotes.error} I don\'t have \`MANAGE_ROLES\` permission`)

    if (member.roles.highest.position >= interaction.guild.me.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`${client.emotes.error} This member have a higher role than me`)

    if (member.roles.highest.position >= interaction.member.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`${client.emotes.error} This member have a higher role than you`)

    if (!member.kickable) return interaction.followUp(`${client.emotes.error} I can\'t mute this member`);

    let mute_role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted');

    if (!mute_role) {
      await interaction.guild.roles.create({
        name: 'Muted',
        permissions: [],
        reason: 'Mute role'
      })
    }

    let reason = args[1] || 'None';

    await interaction.guild.channels.cache
      .filter(c => c.type == 'GUILD_TEXT')
      .forEach(channel => {
        channel.permissionOverwrites.edit(mute_role.id, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      })

    member.roles.add(mute_role)
      .then(() => {

        interaction.followUp(`${member} Got muted 🤐, following reason: ${reason}`)

      })
      .catch(() => {

        interaction.followUp(`${client.emotes.error} I can\'t mute this member`);

      })

  }
}