const express = require('express');
const router = express.Router();
const refereeService = require('../services/refereeService');
const authenticateToken = require('../middlewares/auth');

/**
 * @openapi
 * /referees:
 *   get:
 *     summary: Retrieve a list of soccer referees.
 *     tags:
 *       - Referees
 *     responses:
 *       200:
 *         description: Fetches a list of soccer referees.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 referees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 0
 *                       name:
 *                         type: string
 *                         example: Wilton Pereira Sampaio
 *                       federation:
 *                         type: string
 *                         nullable: true
 *                         example: FIFA
 *                       gender:
 *                         type: string
 *                         nullable: true
 *                         example: Homem
 *                       age:
 *                         type: integer
 *                         nullable: true
 *                         example: 42
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
router.get('/referees', async (req, res, next) => {
    try {
        const referees = await refereeService.getReferee();
        res.json({ referees: referees });
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /referees:
 *   post:
 *     summary: Register a referee in the system.
 *     tags:
 *       - Referees
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
 *               federation:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               country:
 *                 type: string    
 *     responses:
 *       201:
 *         description: Referee registered successfully.
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
router.post('/referees', authenticateToken, async (req, res, next) => {
    try {
        await refereeService.create(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /referees:
 *   put:
 *     summary: Update a referee in the system.
 *     tags:
 *       - Referees
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
 *               federation:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               country:
 *                 type: string    
 *     responses:
 *       201:
 *         description: Referee updated successfully.
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
router.put('/referees', authenticateToken, async (req, res, next) => {
    try {
        await refereeService.update(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /referees/{id}:
 *   delete:
 *     summary: Delete a referee in the system.
 *     tags:
 *       - Referees
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the referee to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Referee deleted successfully.
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
router.delete('/referees/:id', authenticateToken, async (req, res, next) => {
    try {
        await refereeService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
