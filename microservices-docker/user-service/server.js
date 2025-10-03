// User Service - server.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { createClient } = require("redis");

const app = express();
app.use(express.json());

// Config from environment (set in docker-compose)
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/microdb";
const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";

// ---------- Mongo (Mongoose) setup --------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Mongo connected"))
  .catch(err => console.error("Mongo connection error:", err));

// Simple User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ---------- Redis client -----------------------
const redisClient = createClient({ url: REDIS_URL });
redisClient.on("error", (err) => console.error("Redis Client Error", err));
(async () => { await redisClient.connect(); console.log("Redis connected"); })();

// ---------- Routes -----------------------------
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "username and password required" });
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: "username exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash });

    // Simple session: store a session key in Redis (for demo)
    const sessionKey = `session:${user._id}`;
    await redisClient.set(sessionKey, JSON.stringify({ userId: user._id, username: user.username }), { EX: 60 * 60 }); // 1 hour

    res.json({ message: "User created", userId: user._id, sessionKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    const sessionKey = `session:${user._id}`;
    await redisClient.set(sessionKey, JSON.stringify({ userId: user._id, username: user.username }), { EX: 60 * 60 }); // 1 hour
    res.json({ message: "login success", userId: user._id, sessionKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// Example protected route using Redis session
app.get("/me", async (req, res) => {
  try {
    const sessionKey = req.header("x-session");
    if (!sessionKey) return res.status(401).json({ error: "no session" });
    const data = await redisClient.get(sessionKey);
    if (!data) return res.status(401).json({ error: "invalid or expired session" });
    res.json({ session: JSON.parse(data) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

app.listen(4000, () => console.log("User Service running on port 4000"));
