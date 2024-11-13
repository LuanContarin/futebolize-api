const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'dom.sqlite'
});

sequelize.authenticate() 
    .then(() => {
        console.log('Connected successfully.');
        return sequelize.sync();
    })
    .catch(err => {
        console.error('Connection error: ', err);
    })

module.exports = sequelize;