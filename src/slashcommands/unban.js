const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'unban',
  description: 'Unban a member',
  permissions: 'BAN_MEMBERS',
  cooldown: 5,
  options: [
    {
      name: 'user-id',
      description: 'the banned user id',
      type: 'STRING',
      required: true
    }
  ],

  run: async function(client, interaction, args) {

    let user = await client.users.fetch(args[0]).catch(() => null);

    if (!user) return interaction.followUp(`${client.emotes.error} Could not found this user`)

    if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) return interaction.followUp(`I don\'t have \`BAN_MEMBERS\` permission`)

    interaction.guild.bans.fetch().then(bans => {
      if (bans.size == 0) return interaction.followUp(`${client.emotes.error} I can't find any banned members`)
      const banned_user = bans.find(ban => ban.user.id === user.id);

      if (banned_user) {
        interaction.guild.members.unban(user.id)
          .then(() => {

            interaction.followUp(`${user} Is now unbanned 🛬`)

          })
          .catch(err => {

            interaction.followUp(`${client.emotes.error} This member is not banned`)

          })
      } else {
        interaction.followUp(`${client.emotes.error} This member is not banned`)
      }//الكود شغال كويس
    })

  }
}