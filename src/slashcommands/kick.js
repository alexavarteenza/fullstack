const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'kick',
  description: 'Kick a member!',
  permissions: "KICK_MEMBERS",
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
      description: 'the kick reason',
      type: 'STRING'
    }
  ],

  run: async function(client, interaction, args) {

    let member = interaction.guild.members.cache.get(args[0]);

    if (!member) return interaction.followUp(`${client.emotes.error} I can\'t find this member`)

    let reason = args[1];

    if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) return interaction.followUp(`${client.emotes.error} I don\'t have \`KICK_MEMBERS\` permission`)

    if (member.roles.highest.position >= interaction.guild.me.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`${client.emotes.error} This member have a higher role than me`)

    if (member.roles.highest.position >= interaction.member.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`${client.emotes.error} This member have a higher role than you`)

    if (!member.kickable) return interaction.followUp(`${client.emotes.error} I can\'t kick this member`);

    member.kick({ days: 7, reason: reason }).then(() => {
      interaction.followUp(`${member} Got kicked ✈️, following reason: ${reason}`)
    }).catch(() => {
      interaction.followUp(`${client.emotes.error} I can\'t kick this member`);
    })
  },
};