import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { globalLimiter,
         puzzleWriteLimiter,
         googleLoginLimiter,
         reportLimiter } from "./rateLimits.js";

import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import puzzleRouter from "./routes/puzzle.js"
import reportRouter from "./routes/report.js"

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use(globalLimiter);
app.use("/auth/google", googleLoginLimiter);
app.use("/puzzle", puzzleWriteLimiter);
app.use("/report", reportLimiter)

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/puzzle", puzzleRouter);
app.use("/report", reportRouter);

app.get("/", (_, res) => {
  res.send("Cubing Tracker API");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});