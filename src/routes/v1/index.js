const v1 = require("express").Router();

const generalRoutes = require("./general");
const statisticsRoutes = require("./statistics");

v1.use("/", generalRoutes);
v1.use("/statistics", statisticsRoutes);

module.exports = v1;
