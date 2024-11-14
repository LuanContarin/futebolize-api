/**
 * @openapi
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Invalid password."
 *         statusCode:
 *           type: integer
 *           example: 400
 *         details:
 *           type: string
 *           description: An object containing more details about the error that ocurred like parameters, etc.
 *           example: { id: 0 }
 */