const v1 = require("express").Router();

const generalRoutes = require("./general");
const patentsRoutes = require("./patents");
const statisticsRoutes = require("./statistics");

v1.use("/", generalRoutes);
v1.use("/patents", patentsRoutes);
v1.use("/statistics", statisticsRoutes);

module.exports = v1;
