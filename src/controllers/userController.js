const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authenticateToken = require('../middlewares/auth');

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register an user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation/Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/users/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.register(username, password);
        if (!user)
            res.status(400).json({ error: 'An error ocurred when creating the user.' });

        res.status(201).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login as an user in the system and get the authorization token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Validation/Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Retrieve all system users.
 *     description: Fetches a list of users from the system.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Fetches a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user's unique UUID.
 *                         example: "4c552fa2-2909-46c4-ae1f-8305e238d287"
 *                       username:
 *                         type: string
 *                         description: The user's username.
 *                         example: "exampleUser"
 *       400:
 *         description: Validation/Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized. Invalid or missing Bearer token.
 */
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json({ users: users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;