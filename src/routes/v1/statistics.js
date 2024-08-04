const statisticsRoutes = require("express").Router();

const statistics = require("../../controllers/statistics");

statisticsRoutes.get("/status", statistics.status);
statisticsRoutes.get("/requests/:period", statistics.validations.requestsByPeriod, statistics.requestsByPeriod);
statisticsRoutes.get("/top-inventors/:size", statistics.validations.topInventors, statistics.topInventors);
statisticsRoutes.get("/top-holders/:size", statistics.validations.topHolders, statistics.topHolders);
statisticsRoutes.get("/recent-requests/:size", statistics.validations.recentRequests, statistics.recentRequests);

module.exports = statisticsRoutes;
