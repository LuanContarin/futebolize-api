const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Teams', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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