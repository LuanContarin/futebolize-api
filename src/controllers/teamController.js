const express = require('express');
const router = express.Router();
const teamService = require('../services/teamService');
const authenticateToken = require('../middlewares/auth');

/**
 * @openapi
 * /teams:
 *   get:
 *     summary: Retrieve a list of brazilian soccer teams.
 *     tags:
 *       - Teams
 *     responses:
 *       200:
 *         description: Fetches a list of brazilian soccer teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 0
 *                       name:
 *                         type: string
 *                         example: Palmeiras
 *                       city:
 *                         type: string
 *                         nullable: true
 *                         example: São Paulo
 *                       homeStadium:
 *                         type: string
 *                         nullable: true
 *                         example: Allianz Parque
 *                       foundedYear:
 *                         type: integer
 *                         nullable: true
 *                         example: 1914
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
router.get('/teams', async (req, res, next) => {
    try {
        const teams = await teamService.getTeams();
        res.json({ teams: teams });
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /teams:
 *   post:
 *     summary: Register a team in the system.
 *     tags:
 *       - Teams
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
 *                 type: string
 *                 required: true
 *               city:
 *                 type: string
 *               homeStadium:
 *                 type: string
 *               foundedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Team registered successfully.
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
router.post('/teams', authenticateToken, async (req, res, next) => {
    try {
        await teamService.create(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /teams:
 *   put:
 *     summary: Update a team in the system.
 *     tags:
 *       - Teams
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
 *               city:
 *                 type: string
 *               homeStadium:
 *                 type: string
 *               foundedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Team updated successfully.
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
router.put('/teams', authenticateToken, async (req, res, next) => {
    try {
        await teamService.update(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team in the system.
 *     tags:
 *       - Teams
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the team to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Team deleted successfully.
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
router.delete('/teams/:id', authenticateToken, async (req, res, next) => {
    try {
        await teamService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;