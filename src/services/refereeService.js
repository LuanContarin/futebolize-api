const ValidationError = require('../exceptions/validationError');
const refereeRepository = require('../repositories/refereeRepository');

class RefereeService {
    async getReferee() {
        return await refereeRepository.getAll();
    }

    async create(referee) {
        if (!referee.name)
            throw new ValidationError('Invalid referee name.');

        return await refereeRepository.create(referee);
    }

    async update(referee) {
        if (!referee.id)
            throw new ValidationError('Invalid referee ID.');
        if (!referee.name)
            throw new ValidationError('Invalid referee name.');

        return await refereeRepository.update(referee);
    }

    async delete(refereeId) {
        if (!refereeId)
            throw new ValidationError('Invalid referee ID.');

        return await refereeRepository.delete(refereeId);
    }
}

module.exports = new RefereeService();