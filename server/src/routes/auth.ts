import express from "express";
import { verifyGoogleToken } from "../auth/google.js";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    const googleUser = await verifyGoogleToken(token);
    
    return res.json(googleUser);

  } catch (err) {
    return res.status(401).json({ error: "Invalid Google token" });
  }
});

export default router;