const Download = require("../models/download.model");
const mongoose = require("mongoose");
const { validateDownloadPayload } = require("../utils/validators");

async function trackDownload(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable. Check Atlas URI/network and try again.",
      });
    }

    const payload = {
      label: req.body.label,
      fileName: req.body.fileName,
      section: req.body.section,
    };

    const errors = validateDownloadPayload(payload);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid download request.",
        errors,
      });
    }

    await Download.create(payload);

    return res.status(201).json({
      success: true,
      message: "Download tracked.",
    });
  } catch (error) {
    return next(error);
  }
}

async function listDownloads(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable. Check Atlas URI/network and try again.",
      });
    }

    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const downloads = await Download.find().sort({ createdAt: -1 }).limit(limit);

    return res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  trackDownload,
  listDownloads,
};
