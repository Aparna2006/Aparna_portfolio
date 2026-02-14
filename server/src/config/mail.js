const nodemailer = require("nodemailer");
let cachedTransporter = null;
let cachedKey = null;

function getTransporter() {
  const host = (process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "")
    .replace(/\s+/g, "")
    .trim();
  const missing = [];

  if (!host) missing.push("SMTP_HOST");
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");

  if (missing.length > 0) {
    return {
      transporter: null,
      error: `Missing required SMTP env: ${missing.join(", ")}`,
    };
  }

  const cacheKey = `${host}|${port}|${user}|${pass}`;
  if (cachedTransporter && cachedKey === cacheKey) {
    return { transporter: cachedTransporter, error: null };
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user,
      pass,
    },
  });
  cachedKey = cacheKey;

  return { transporter: cachedTransporter, error: null };
}

module.exports = {
  getTransporter,
};
