const ValidationError = require('../exceptions/validationError');
const Team = require('../models/team');

class TeamRepository {
    async getAll() {
        return await Team.findAll();
    }

    async create(team) {
        return await Team.create(team);
    }

    async update(team) {
        const teamTable = await Team.findByPk(team.id);
        if (!team)
            throw new ValidationError('Team with specified ID doesn\'t exist.');

        return await teamTable.update(team);
    }

    async delete(teamId) {
        const team = await Team.findByPk(teamId);
        if (!team)
            throw new ValidationError('Team with specified ID doesn\'t exist.');

        return await team.destroy();
    }
}

module.exports = new TeamRepository();