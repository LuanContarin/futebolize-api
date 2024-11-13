const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('./config/swagger');
const teamController = require('./controllers/teamController');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use('/api', teamController);

// Swagger registration
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs\n`);
});