const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload(payload) {
  const errors = [];

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters.");
  }

  if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
    errors.push("A valid email is required.");
  }

  if (!payload.message || payload.message.trim().length < 5) {
    errors.push("Message must be at least 5 characters.");
  }

  return errors;
}

function validateDownloadPayload(payload) {
  const errors = [];

  if (!payload.label || payload.label.trim().length === 0) {
    errors.push("Download label is required.");
  }

  if (!payload.fileName || payload.fileName.trim().length === 0) {
    errors.push("File name is required.");
  }

  return errors;
}

module.exports = {
  validateContactPayload,
  validateDownloadPayload,
};
