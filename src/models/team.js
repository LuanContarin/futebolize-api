const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Team = database.define('Teams', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    homeStadium: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foundedYear: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    }
});

module.exports = Team;