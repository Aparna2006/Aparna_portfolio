const nodemailer = require("nodemailer");

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

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    }),
    error: null,
  };
}

module.exports = {
  getTransporter,
};
