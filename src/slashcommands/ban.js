const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'ban',
  description: 'Ban a member',
  permissions: "BAN_MEMBERS",
  cooldown: 5,
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 'USER',
      required: true
    },
    {
      name: 'reason',
      description: 'the ban reason',
      type: 'STRING'
    }
  ],

  run: async function(client, interaction, args) {

    let member = interaction.guild.members.cache.get(args[0]);

    if (!member) return interaction.followUp(`${client.emotes.error} I can\'t find this member`)

    let reason = args[1];

    if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) return interaction.followUp(`${client.emotes.error} I don\'t have \`BAN_MEMBERS\` permission`)

    if (member.roles.highest.position >= interaction.guild.me.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`${client.emotes.error} This member have a higher role than me`)

    if (member.roles.highest.position >= interaction.member.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`${client.emotes.error} This member have a higher role than you`)

    if (!member.bannable) return interaction.followUp(`${client.emotes.error} I can\'t ban this member`);

    member.ban({ days: 7, reason: reason }).then(() => {

      interaction.followUp(`${member} Got banned ✈️, following reason: ${reason}`)

    }).catch(() => {

      interaction.followUp(`${client.emotes.error} I can\'t ban this member`);

    })
  },
};