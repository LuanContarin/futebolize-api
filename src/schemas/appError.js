/**
 * @openapi
 * components:
 *   schemas:
 *     AppError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Internal Server Error."
 *         statusCode:
 *           type: integer
 *           example: 500
 *         details:
 *           type: string
 *           description: An object containing more details about the error that ocurred like parameters, etc.
 *           example: { exception: '...' }
 */