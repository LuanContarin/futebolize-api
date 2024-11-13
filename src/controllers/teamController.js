const express = require('express');
const router = express.Router();
const teamService  = require('../services/teamService');

/**
 * @openapi
 * /api/teams:
 *   get:
 *     summary: Retrieve a list of brazilian soccer teams.
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
 *       400:
 *         description: Validation/Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'       
 */
router.get('/teams', async (req, res) => {
    try {
        const teams = await teamService.getTeams();
        res.json({ teams: teams });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;