import express from "express";
import { blogGeneration } from "../../controller/blogGeneration";

const router = express.Router();

router.post("/", blogGeneration);

export default router;
