const ValidationError = require('../exceptions/validationError');
const Referee = require('../models/referee');

class RefereeRepository {
    async getAll() {
        return await Referee.findAll();
    }

    async create(referee) {
        return await Referee.create(referee);
    }

    async update(referee) {
        const refereeTable = await Referee.findByPk(referee.id);
        if (!refereeTable)
            throw new ValidationError('Referee with specified ID doesn\'t exist.');

        return await refereeTable.update(referee);
    }

    async delete(refereeId) {
        const referee = await Referee.findByPk(refereeId);
        if (!referee)
            throw new ValidationError('Referee with specified ID doesn\'t exist.');

        return await referee.destroy();
    }
}

module.exports = new RefereeRepository();