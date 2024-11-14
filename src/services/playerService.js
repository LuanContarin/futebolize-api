const ValidationError = require('../exceptions/validationError');
const playerRepository = require('../repositories/playerRepository');

class PlayerService {
    async getPlayers() {
        return await playerRepository.getAll();
    }

    async create(player) {
        if (!player.name)
            throw new ValidationError('Invalid player name.');

        return await playerRepository.create(player);
    }

    async update(player) {
        if (!player.id)
            throw new ValidationError('Invalid player ID.');
        if (!player.name)
            throw new ValidationError('Invalid player name.');

        return await playerRepository.update(player);
    }

    async delete(playerId) {
        if (!playerId)
            throw new ValidationError('Invalid player ID.');

        return await playerRepository.delete(playerId);
    }
}

module.exports = new PlayerService();