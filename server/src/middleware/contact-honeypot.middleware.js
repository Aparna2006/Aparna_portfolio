function contactHoneypot(req, res, next) {
  const honeypot = req.body.company || req.body.website || "";

  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return res.status(400).json({
      success: false,
      message: "Spam detection triggered.",
      errors: ["Invalid form submission."],
      requestId: req.requestId || null,
    });
  }

  return next();
}

module.exports = contactHoneypot;
