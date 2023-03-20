import express from "express";
import { summaryGeneration } from "../../controller/summayGeneration";
import { blogGeneration } from "../../controller/blogGeneration";
import { googleTrendsResolver } from "../../controller/googleTrendsResolver";

const router = express.Router();

router.post("/blogs", blogGeneration);
router.post("/summary", summaryGeneration);

router.get("/googleGeneration", googleTrendsResolver);

export default router;
