const express = require("express");
const router = express.Router();
const TeamMoreInfoService = require("../services/teamMoreInfoService");
const bodyParser = require("body-parser");

// const TeamMoreInfoRouter = router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
/**
 * @openapi
 * /api/teams/moreinfo:
 *   get:
 *     summary: Retrieve more information of Brazilian soccer team.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fetches more information by team of brazilian soccer teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team:
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
 *                       titles:
 *                         type: integer
 *                         nullable: false
 *                         example: 0
 *                       relegation:
 *                         type: integer
 *                         example: 2
 *                       crowd:
 *                         type: integer
 *                         example: 30000
 *                       last_title_date:
 *                         type: string
 *                         format: date
 *                         example: "2023-12-05"
 */

router.get("/teams/moreinfo", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).json({ error: "No user in request" });
    }

    const team = await TeamMoreInfoService.getTeamInfo(name);
    res.json({
      id: team.dataValues.id,
      name: team.dataValues.name,
      titles: team.dataValues.titles,
      relegation: team.dataValues.relegation,
      crowd: team.dataValues.crowd,
      last_title_date: team.dataValues.last_title_date,
    });
    console.log();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @openapi
 * /api/teams/moreinfo:
 *   post:
 *     summary: Register more information to brazilian soccer team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               titles:
 *                 type: string
 *               relegation:
 *                 type: string
 *               crowd:
 *                 type: string
 *               last_title_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Validation/Application error.
 *
 *
 */

router.post("/teams/moreinfo", async (req, res) => {
  try {
    const { name, titles, relegation, crowd, last_title_date } = req.body;
    if (!name) {
      res.status(401).json({ error: "No user in request" });
    }
    const team = await TeamMoreInfoService.postTeamInfo(
      name,
      titles,
      relegation,
      crowd,
      last_title_date
    );
    res.status(201).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
