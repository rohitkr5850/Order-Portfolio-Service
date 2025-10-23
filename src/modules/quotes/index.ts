// modules/quotes/index.ts
import express from "express";
import quotesController from "./quotes.controller";

const router = express.Router();
router.use("/quotes", quotesController);

export const quotesRoutes = router;
