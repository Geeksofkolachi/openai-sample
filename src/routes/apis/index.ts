import express from "express";
import routes from "./route";

const router = express.Router();

router.use("/", routes);

export default router;
