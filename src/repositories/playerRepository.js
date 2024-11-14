const ValidationError = require('../exceptions/validationError');
const Player = require('../models/player');

class PlayerRepository {
    async getAll() {
        return await Player.findAll();
    }

    async create(player) {
        return await Player.create(player);
    }

    async update(player) {
        const playerTable = await Player.findByPk(player.id);
        if (!playerTable)
            throw new ValidationError('Player with specified ID doesn\'t exist.');

        return await playerTable.update(player);
    }

    async delete(playerId) {
        const player = await Player.findByPk(playerId);
        if (!player)
            throw new ValidationError('Player with specified ID doesn\'t exist.');

        return await player.destroy();
    }
}

module.exports = new PlayerRepository();