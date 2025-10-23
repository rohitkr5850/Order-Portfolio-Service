import { Router } from "express";
import { orderController } from "./order.controller";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createOrderSchema, updateOrderSchema } from "./order.validator";

const router = Router();

router.post("/", validateRequest(createOrderSchema), orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.put("/:id", validateRequest(updateOrderSchema), orderController.update);
router.delete("/:id", orderController.remove);

export const orderRoutes = router;
