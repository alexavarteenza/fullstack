const { MessageEmbed, Collection } = require('discord.js')
module.exports = async (client, interaction) => {

  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false })
    let embed = new MessageEmbed()

    const cmd = client.commands.get(interaction.commandName);

    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options ?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    if (cmd.cooldown) {
      if (!client.cooldown.has(cmd.name)) { client.cooldown.set(cmd.name, new Collection()) }

      if (client.cooldown.get(cmd.name).has(interaction.user.id)) {

        if (Date.now() < client.cooldown.get(cmd.name).get(interaction.user.id) + (cmd.cooldown) * 1000) {

          const time_left = (client.cooldown.get(cmd.name).get(interaction.user.id) + (cmd.cooldown) * 1000 - Date.now()) / 1000;

          return interaction.followUp({
            content: `cooldown for \`${time_left.toFixed(1)}\` seconds`,
            ephemeral: true
          })

        }
      }

      client.cooldown.get(cmd.name).set(interaction.user.id, Date.now());

      setTimeout(() => client.cooldown.get(cmd.name).delete(interaction.user.id), (cmd.cooldown) * 1000);

    }

    if (cmd.permissions) {
      if (!client.vaildPermissions.includes(cmd.permissions)) return;

      if (!interaction.member.permissions.has(cmd.permissions)) return interaction.followUp({
        content: `You don\'t have \`${cmd.permissions}\` permission`,
        ephemeral: true
      })
    }

    cmd.run(client, interaction, args);
  }
}