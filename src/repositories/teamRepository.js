const Team = require('../models/team');

class TeamRepository {
    async getAll() {
        return await Team.findAll();
    }
}

module.exports = new TeamRepository();