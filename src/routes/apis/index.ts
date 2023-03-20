import express from "express";
import blogGeneration from "./route";

const router = express.Router();

router.use("/blog", blogGeneration);

export default router;
