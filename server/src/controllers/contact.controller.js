const Contact = require("../models/contact.model");
const mongoose = require("mongoose");
const { validateContactPayload } = require("../utils/validators");
const { sendContactMail } = require("../services/contact-mail.service");

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

    setImmediate(async () => {
      const mailStatus = await sendContactMail(payload);
      if (!mailStatus.ok) {
        console.error(`[contact:${requestId}] Email delivery failed: ${mailStatus.reason}`);
        return;
      }
      if (!mailStatus.autoReplySent && mailStatus.autoReplyError) {
        console.warn(`[contact:${requestId}] Auto-reply failed: ${mailStatus.autoReplyError}`);
      }
    });

    return res.status(201).json({
      success: true,
      message: "Message received successfully.",
      requestId,
      data: {
        id: created._id,
        createdAt: created.createdAt,
        queuedForEmail: true,
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
