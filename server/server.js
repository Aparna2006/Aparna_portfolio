const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const apiRoutes = require("./src/routes");
const requestIdMiddleware = require("./src/middleware/request-id.middleware");

dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;
const ROOT_DIR = path.resolve(__dirname, "..");

const normalizeOrigin = (value) => (value || "").trim().replace(/\/$/, "").toLowerCase();

const allowedOrigins = (process.env.FRONTEND_ORIGINS || "")
  .split(",")
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);
    const isConfigured = allowedOrigins.includes(normalizedOrigin);
    const isVercelPreview = normalizedOrigin.endsWith(".vercel.app");

    if (isConfigured || isVercelPreview) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

connectDB();

app.use(morgan("dev"));
app.use(requestIdMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api", apiRoutes);

app.use("/assets", express.static(path.join(ROOT_DIR, "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(ROOT_DIR, "index.html"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ success: false, message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
