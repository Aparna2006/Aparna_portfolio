const Contact = require("../models/contact.model");
const mongoose = require("mongoose");
const { validateContactPayload } = require("../utils/validators");
const {
  sendPrimaryContactMail,
  sendAutoReplyMail,
} = require("../services/contact-mail.service");

async function createContact(req, res, next) {
  try {
    const requestId = req.requestId || null;

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable. Check Atlas URI/network and try again.",
        requestId,
      });
    }

    const payload = {
      fullName: req.body.fullName || req.body.fullname || req.body.name,
      email: req.body.email,
      message: req.body.message,
      source: req.body.source,
    };

    const errors = validateContactPayload(payload);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact request.",
        errors,
        requestId,
      });
    }

    const created = await Contact.create(payload);
    console.info(`[contact:${requestId}] Message saved for ${payload.email}`);

    const primaryMailStatus = await sendPrimaryContactMail(payload);
    if (!primaryMailStatus.ok) {
      console.error(`[contact:${requestId}] Primary email failed: ${primaryMailStatus.reason}`);
      return res.status(502).json({
        success: false,
        message: "Message was saved, but email delivery failed. Please try again.",
        errors: [primaryMailStatus.reason],
        requestId,
        data: {
          id: created._id,
          createdAt: created.createdAt,
          saved: true,
        },
      });
    }

    setImmediate(async () => {
      const autoReplyStatus = await sendAutoReplyMail(payload);
      if (!autoReplyStatus.ok) {
        console.warn(`[contact:${requestId}] Auto-reply failed: ${autoReplyStatus.reason}`);
      }
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      requestId,
      data: {
        id: created._id,
        createdAt: created.createdAt,
        emailDelivered: true,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function listContacts(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable. Check Atlas URI/network and try again.",
      });
    }

    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(limit);

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createContact,
  listContacts,
};
