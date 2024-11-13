const teamRepository = require('../repositories/teamRepository');

class TeamService {
    async getTeams() {
        return teamRepository.getAll();
    }
}

module.exports = new TeamService();