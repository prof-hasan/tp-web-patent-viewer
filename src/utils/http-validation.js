const { validationResult } = require("express-validator");

/**
 * Realiza a validação da requisição com base nas regras do express-validator.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function validateRequest (req, res, next) {
	const errors = validationResult(req);
	if (errors.isEmpty())
		return next();

	res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
}

module.exports = { validateRequest };
