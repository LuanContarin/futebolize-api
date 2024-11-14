const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Player = database.define('Players', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    number: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Player;