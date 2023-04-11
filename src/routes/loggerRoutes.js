import { Router } from "express";
import { logger } from "../logger.js";

const router = Router();

router.get("/", (req, res) => {
  logger.debug("Debug message");
  logger.http("HTTP message");
  logger.info("Info message");
  logger.warning("Warning message");
  logger.error("Error message");
  logger.fatal("Fatal message");
  res.send("Autorizado en consola!");
});

export default router;