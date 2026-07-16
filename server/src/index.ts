import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import puzzleRouter from "./routes/puzzle.js"

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/puzzle", puzzleRouter);

app.get("/", (_, res) => {
  res.send("Cubing Tracker API");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});