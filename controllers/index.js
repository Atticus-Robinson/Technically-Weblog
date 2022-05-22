const router = require("express").Router();

//Require lower-level routes
const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes");

//Package lower level routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
