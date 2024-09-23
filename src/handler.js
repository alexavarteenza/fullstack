const fs = require('fs');

const config = require('./config.js');

const Discord = require('discord.js');

module.exports = (client) => {

  //-----------------------------------------------\\

  client.emotes = config.emotes;

  client.cooldown = new Map();

  client.slashCommands = [];

  client.commands = new Discord.Collection();

  client.vaildPermissions = config.permissions;

  client.login(config.token);

  fs.readdir('./src/slashcommands/', (err, files) => {

    if (err) return console.log(err);

    files.forEach(file => {

      if (!file.endsWith('.js')) return;

      const cmd = require(`./slashcommands/${file}`);

      client.commands.set(cmd.name, cmd)

      client.slashCommands.push(cmd)

      console.log(`Loading command ${cmd.name}.js`)

    })

  })

  //-----------------------------------------------\\

  fs.readdir('./src/events/', (err, files) => {

    if (err) return console.log(err);

    files.forEach(file => {

      if (!file.endsWith('.js')) return;

      let eventName = file.split('.')[0];

      let event = require(`./events/${file}`)

      client.on(eventName, event.bind(null, client))

      console.log(`Loading event ${eventName}.js`)

    })

  })

  //-----------------------------------------------\\

}