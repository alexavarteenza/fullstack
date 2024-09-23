module.exports = async (client, guild) => {
  try {
    await guild.commands.set(client.slashCommands)
  } catch (err) {
  }
}