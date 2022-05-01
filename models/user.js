'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: { 
			type: DataTypes.INTEGER, 
			allowNull: false,
			autoIncrement: true, 
			primaryKey: true 
		},
		discordId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
		totalScore: { type: DataTypes.INTEGER, defaultValue: 0 },
		score: { type: DataTypes.JSON },
		coins: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
		tags: { type: DataTypes.JSON },
    experience: { type: DataTypes.INTEGER, defaultValue: 0 },
    level: { type: DataTypes.INTEGER, defaultValue: 0 },
		profileConfig: { type: DataTypes.JSON, allowNull: false, defaultValue: {
      "layout": "default",
      "backgroundImage": "default",
      "useBackground": "true",
      "backgroundColor": "#FFFFF"
    } },
	}, {
    sequelize,
    modelName: 'User',
  });
  return User;
};