module.exports = async (client) => {
  client.guilds.cache.forEach(async guild => {
    try {
      await guild.commands.set(client.slashCommands)
    } catch (err) {
    }
  })
  console.log(`I am ready !,`)
}