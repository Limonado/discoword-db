const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/assets/users_development.sqlite',
	logging: false
});
const User = require('./models/user')(sequelize, DataTypes);

async function GetUser(user) {
	let userr = await User.findOrCreate({
	  where: { discordId: user.id },
	  defaults: {
	    discordId: user.id,
		name: user.username
	  }
	});
	return userr[0].dataValues;
}

async function AddScore(user, score, game=".") {
	let userr1 = await User.findOrCreate({
	  where: { discordId: user.id },
	  defaults: {
	    discordId: user.id,
		name: user.username
	  }
	});
	let userr = userr1[0].dataValues;

	if (userr.score == null) { userr.score = {}; userr.score[game] = 0; }
	if (userr.totalScore == null) { userr.totalScore = 0; }
	if (userr.score[game] == null) { userr.score[game] = 0;  }
	userr.totalScore += score;
	userr.score[game] += score;

	await User.update(userr, { where: { discordId: user.id }});
}

async function AddXP(user, xpMin, xpMax, game=".") {
	let xp = Math.floor(Math.random() * (xpMax - xpMin+1) + xpMin);
	let goldReward = 0;
	let goldMin = 10;
	let golMax = 30;
	let userr1 = await User.findOrCreate({
	  where: { discordId: user.id },
	  defaults: {
	    discordId: user.id,
			name: user.username,
			totalScore: 0,
			score: {}
	  }
	});
	let userr = userr1[0].dataValues;
	let levelUp = false;

	userr.experience += xp;
	while (userr.experience >= 1000) {
		userr.experience-=1000;
		userr.level++;
		goldReward += Math.floor(Math.random() * (golMax - goldMin+1) + goldMin);
		levelUp = true;
	}
	userr.coins += goldReward;

	await User.update(userr, { where: { discordId: user.id }});
	return  { up: levelUp, level: userr.level, xpAdded: xp, totalXp: userr.experience, reward: goldReward };
}

module.exports = { AddScore, GetUser, AddXP };