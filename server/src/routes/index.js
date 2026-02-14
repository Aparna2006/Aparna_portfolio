const express = require("express");
const contactRoutes = require("./contact.routes");
const downloadRoutes = require("./download.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is healthy.",
    timestamp: new Date().toISOString(),
  });
});

router.use("/contact", contactRoutes);
router.use("/downloads", downloadRoutes);

module.exports = router;
