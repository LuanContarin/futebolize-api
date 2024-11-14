const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Team_More_info = database.define("Team_More_info", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titles: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  relegation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  crowd: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  last_title_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Team_More_info.drop();

module.exports = Team_More_info;
