const removeAccents = require("remove-accents");

function sanitizeName (name) {
	return removeAccents(name.trim()).toUpperCase();
}

module.exports = { sanitizeName };
