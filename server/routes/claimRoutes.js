import express from "express";
import createClaim from "../controllers/claim/createClaim.js";

const router = express.Router();

router.post("/create", createClaim);

export default router;
