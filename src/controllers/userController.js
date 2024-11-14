const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authenticateToken = require('../middlewares/auth');

/**
 * @openapi
 * /users/register:
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
router.post('/users/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        await userService.register(username, password);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /users/login:
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
router.post('/users/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);
        res.json({ token: token });
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /users:
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
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized. Invalid or missing Bearer token.
 *       500:
 *         description: Application error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */
router.get('/users', authenticateToken, async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json({ users: users });
    } catch (error) {
        next(error);
    }
});

module.exports = router;