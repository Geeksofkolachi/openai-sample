import express from "express";
import { summaryGeneration } from "../../controller/summayGeneration";
import { blogGeneration } from "../../controller/blogGeneration";

const router = express.Router();

router.post("/blogs", blogGeneration);
router.post("/summary", summaryGeneration);

export default router;
