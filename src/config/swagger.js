const swaggerJSDoc = require('swagger-jsdoc');
const appConfig = require('./app_config');

const swaggerDefinition = {
	openapi: '3.0.0',
	servers: [{ url: `${appConfig.url}:${appConfig.port}/api` }],
	info: {
		title: 'Futebolize API',
		version: '1.0.0',
		description: 'API for soccer management. Provides endpoints to manage teams, players, and matches, enabling seamless integration with front-end applications and other platforms.',
	},
};

const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: ['src/controllers/*.js', 'src/schemas/*.js'],
};

module.exports = swaggerJSDoc(options);