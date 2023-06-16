import express from "express";
import { getData } from "./controller.js";

const router = express.Router();

router.get("/", getData);

export default router;
