const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");   // ✅ ADD THIS

const app = express();
app.use(express.json());
// ✅ Allow CORS for dev
app.use(cors());   // <-- ADD THIS LINE
// ---- Config via env with safe defaults ----
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017";
const MONGO_DB = process.env.MONGO_DB || "todoapp";

// ---- Robust connect with retry (Mongo may take a moment to be ready) ----
async function connectWithRetry() {
  const uri = `${MONGO_URL}/${MONGO_DB}`;
  const maxRetries = 10;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await mongoose.connect(uri); // Mongoose v6+ uses sensible defaults
      console.log("✅ Connected to MongoDB:", uri);
      return;
    } catch (err) {
      attempt++;
      const delay = Math.min(1000 * attempt, 5000);
      console.log(
        `Mongo connect failed (attempt ${attempt}). Retrying in ${delay}ms...`,
        err.message
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  process.exit(1);
}

connectWithRetry();

// ---- Model ----
const TodoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

// ---- Routes ----
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.post("/add", async (req, res) => {
  if (!req.body.task) return res.status(400).send("task is required");
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.send("Task added!");
});

app.get("/list", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
