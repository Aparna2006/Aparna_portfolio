const express = require("express");
const { trackDownload, listDownloads } = require("../controllers/download.controller");

const router = express.Router();

router.get("/", listDownloads);
router.post("/", trackDownload);

module.exports = router;
