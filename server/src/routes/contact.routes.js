const express = require("express");
const { createContact, listContacts } = require("../controllers/contact.controller");
const contactRateLimit = require("../middleware/contact-rate-limit.middleware");
const contactHoneypot = require("../middleware/contact-honeypot.middleware");

const router = express.Router();

router.get("/", listContacts);
router.post("/", contactRateLimit, contactHoneypot, createContact);

module.exports = router;
