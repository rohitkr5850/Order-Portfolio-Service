import { Router } from "express";
import { portfolioController } from "./portfolio.controller";

const router = Router();

router.get("/", portfolioController.getSummary);

export const portfolioRoutes = router;
