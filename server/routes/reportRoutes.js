import express from "express";
import createReport from "../controllers/report/createReport.js";

const router = express.Router();

router.post("/create", createReport);

export default router;
