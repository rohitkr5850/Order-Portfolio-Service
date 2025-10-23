import { Router } from "express";

// Import module routers (we’ll add these later)
import { orderRoutes } from "../modules/orders";
import { fillRoutes } from "../modules/fills";
import { portfolioRoutes } from "../modules/portfolio";
import { quotesRoutes } from "../modules/quotes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Orders & Portfolio Service API is running 🚀" });
});

// Register domain routes
router.use("/orders", orderRoutes);
router.use("/fills", fillRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/quotes", quotesRoutes);

export default router;
