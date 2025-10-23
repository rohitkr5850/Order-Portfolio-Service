import { Router } from "express";
import { fillController } from "./fill.controller";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createFillSchema } from "./fill.validator";

const router = Router();

router.post("/", validateRequest(createFillSchema), fillController.create);
router.get("/", fillController.getAll);

export const fillRoutes = router;
