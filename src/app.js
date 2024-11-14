const express = require('express');
const swaggerUI = require('swagger-ui-express');
const appConfig = require('./config/app_config');
const swaggerConfig = require('./config/swagger');
const teamController = require('./controllers/teamController');
const userController = require('./controllers/userController');
const errorHandler = require('./middlewares/errorHandler');

const URL = appConfig.url;
const PORT = appConfig.port;

const app = express();
app.use(express.json());
app.use('/api', userController);
app.use('/api', teamController);

// Custom error handler
app.use(errorHandler);

// Swagger registration
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at ${URL}:${PORT}/api-docs`);
    console.log('\n');
});