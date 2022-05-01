const {Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

const config = require("./config.json");

const { GetUser, AddScore, AddXP } = require('./usersDB.js');
const express = require('express');

const app = module.exports = express()

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/user', async (req, res) => {
  try {
    let user = await client.users.fetch(req.query.discordId);
    let userItem = await GetUser(user);
    res.send(userItem);
  }catch(err) {
    res.send({ result: "error" });
  }
});

app.post('/addscore', async (req, res) => {
  try {
    let user = await client.users.fetch(req.user);
    await AddScore(user, req.score, req.game);
    res.send({ result: "success" });
  }catch(err) {
    res.send({ result: "error" });
  }
});

app.post('/addxp', async (req, res) => {
  try{
    let user = await client.users.fetch(req.user);
    await AddXP(user, req.xpMin, req.xpMax, req.game);
    res.send({ result: "success" });
  }catch(err) {
    res.send({ result: "error" });
  }
});

app.listen(3000);


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