const express = require('express');
const router = express.Router();
const playerService = require('../services/playerService');
const authenticateToken = require('../middlewares/auth');

/**
 * @openapi
 * /players:
 *   get:
 *     summary: Retrieve a list of brazilian soccer players.
 *     tags:
 *       - Players
 *     responses:
 *       200:
 *         description: Fetches a list of brazilian soccer players.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 players:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 0
 *                       name:
 *                         type: string
 *                         example: João Kleber
 *                       position:
 *                         type: string
 *                         nullable: true
 *                         example: Atacante
 *                       number:
 *                         type: integer
 *                         nullable: true
 *                         example: 9
 *                       player:
 *                         type: string
 *                         nullable: true
 *                         example: Cuiaba
 *                       country:
 *                         type: string
 *                         nullable: true
 *                         example: Brasil
 *                       createdAt:
 *                         type: string
 *                         example: "2024-11-13T13:52:12.000Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2024-11-13T13:52:12.000Z"
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */
router.get('/players', async (req, res, next) => {
    try {
        const players = await playerService.getPlayers();
        res.json({ players: players });
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /players:
 *   post:
 *     summary: Register a player in the system.
 *     tags:
 *       - Players
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  required: true
 *               position:
 *                  type: string
 *               number:
 *                  type: integer
 *               team:
 *                  type: string
 *               country:
 *                  type: string
 *               createdAt:
 *                  type: string
 *               updatedAt:
 *                  type: string
 *     responses:
 *       201:
 *         description: Player registered successfully.
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */
router.post('/players', authenticateToken, async (req, res, next) => {
    try {
        await playerService.create(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /players:
 *   put:
 *     summary: Update a player in the system.
 *     tags:
 *       - Players
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 required: true
 *               name:
 *                 type: string
 *                 required: true
 *               position:
 *                 type: string
 *               number:
 *                 type: integer
 *               team:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: player updated successfully.
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */
router.put('/players', authenticateToken, async (req, res, next) => {
    try {
        await playerService.update(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /players/{id}:
 *   delete:
 *     summary: Delete a player in the system.
 *     tags:
 *       - Players
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the player to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: player deleted successfully.
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */
router.delete('/players/:id', authenticateToken, async (req, res, next) => {
    try {
        await playerService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
