const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Referee = database.define('Referees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    federation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Referee;