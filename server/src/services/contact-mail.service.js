const { getTransporter } = require("../config/mail");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendContactMail(payload) {
  const { transporter, error } = getTransporter();
  const to = process.env.CONTACT_RECEIVER || "aparnakl2006@gmail.com";
  const smtpUser = (process.env.SMTP_USER || "").trim();
  const fromName = (process.env.SMTP_FROM_NAME || "Portfolio Contact").trim();
  const from = {
    name: fromName,
    address: smtpUser,
  };

  if (!transporter || !smtpUser) {
    return {
      ok: false,
      reason: error || "SMTP not configured",
    };
  }

  const subject = `New Portfolio Contact: ${payload.fullName}`;
  const text = [
    "You received a new portfolio contact form submission.",
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Source: ${payload.source || "portfolio-web"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <h2>New Portfolio Contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Source:</strong> ${escapeHtml(payload.source || "portfolio-web")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    const autoReplySubject = "Thanks for contacting Aparna";
    const autoReplyText = [
      `Hi ${payload.fullName},`,
      "",
      "Thanks for reaching out through my portfolio.",
      "I received your message and will get back to you shortly.",
      "",
      "Regards,",
      "Aparna Kondiparthy",
    ].join("\n");

    const autoReplyHtml = `
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Thanks for reaching out through my portfolio.</p>
      <p>I received your message and will get back to you shortly.</p>
      <p>Regards,<br>Aparna Kondiparthy</p>
    `;

    let autoReplySent = true;
    let autoReplyError = null;

    try {
      await transporter.sendMail({
        from,
        to: payload.email,
        subject: autoReplySubject,
        text: autoReplyText,
        html: autoReplyHtml,
      });
    } catch (error) {
      autoReplySent = false;
      autoReplyError = error.message;
    }

    return { ok: true, autoReplySent, autoReplyError };
  } catch (error) {
    return {
      ok: false,
      reason: error.message,
    };
  }
}

module.exports = {
  sendContactMail,
};
