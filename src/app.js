
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const appConfig = require("./config/app_config");
const swaggerConfig = require("./config/swagger");
const teamController = require("./controllers/teamController");
const userController = require("./controllers/userController");
const errorHandler = require('./middlewares/errorHandler');
const teamMoreInfoControler = require("./controllers/teamMoreInfoController");
const playerController = require("./controllers/playerController");



const URL = appConfig.url;
const PORT = appConfig.port;

const app = express();
app.use(express.json());
app.use("/api", userController);
app.use("/api", teamController);
app.use("/api", teamMoreInfoControler);
app.use("/api", playerController);

// Custom error handler
app.use(errorHandler);

// Swagger registration
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at ${URL}:${PORT}/api-docs`);
  console.log("\n");
});
