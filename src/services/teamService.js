const ValidationError = require('../exceptions/validationError');
const teamRepository = require('../repositories/teamRepository');

class TeamService {
    async getTeams() {
        return await teamRepository.getAll();
    }

    async create(team) {
        if (!team.name)
            throw new ValidationError('Invalid team name.');
        if (team?.foundedYear > new Date().getUTCFullYear())
            throw new ValidationError('Founded year can\'t be in the future.');

        return await teamRepository.create(team);
    }

    async update(team) {
        if (!team.id)
            throw new ValidationError('Invalid team ID.');
        if (!team.name)
            throw new ValidationError('Invalid team name.');

        return await teamRepository.update(team);
    }

    async delete(teamId) {
        if (!teamId)
            throw new ValidationError('Invalid team ID.');

        return await teamRepository.delete(teamId);
    }
}

module.exports = new TeamService();