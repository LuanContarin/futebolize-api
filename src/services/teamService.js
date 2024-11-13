const teamRepository = require('../repositories/teamRepository');

class TeamService {
    async getTeams() {
        return await teamRepository.getAll();
    }
}

module.exports = new TeamService();