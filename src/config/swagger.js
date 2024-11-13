const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Futebolize API',
		version: '1.0.0',
		description: 'API para gestão de futebol. Oferece endpoints para gerenciar equipes, jogadores e partidas, permitindo integração perfeita com aplicações front-end e outras plataformas.',
	},
};

const options = {
	definition: swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: ['src/controllers/*.js'],
};

module.exports = swaggerJSDoc(options);