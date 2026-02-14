const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    section: {
      type: String,
      default: "resume",
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Download", downloadSchema);
