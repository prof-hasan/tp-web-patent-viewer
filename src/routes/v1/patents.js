const patentsRoutes = require("express").Router();

const patents = require("../../controllers/patents");

patentsRoutes.get("/filter", patents.validations.filter, patents.filter);
patentsRoutes.get("/details/:code", patents.validations.details, patents.details);

module.exports = patentsRoutes;
