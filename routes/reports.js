const express = require("express");
const controller = require("../controllers/reports");

const router = express.Router();

router.get("/", controller.getExecutiveSummary);

module.exports = router;
