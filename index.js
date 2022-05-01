const express = require('express');

const app = module.exports = express()

app.get('/', function(req, res){
  res.send('Hello World');
});

app.post('/user', function (req, res) {
  res.send("discordId is set to "+req.query.discordId);
});

app.listen(3000);

const {Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

const config = require("./config.json");

client.on('ready', () =>{
  client.user.setActivity(":thew");
  console.log(`${client.user.username} foi iniciado`);
});

client.on("messageCreate", async function(message){
  if(!message.content.toLowerCase().startsWith(config.prefix)) return;
  let args = message.content.slice(config.prefix.length).split(" ");
  let command = args.shift().toLowerCase();

  try{
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  }catch (erro){
    console.log(erro);
  }
});

client.login(config.token);