import { eventBus } from "../../modules/events/eventBus";
import { logger } from "../../core/logging/logger";

export function loadEvents() {
  eventBus.subscribe("order.created", (payload) => {
    logger.info({ event: "order.created", payload });
  });

  eventBus.subscribe("fill.applied", (payload) => {
    logger.info({ event: "fill.applied", payload });
  });

  logger.info("✅ Event bus subscriptions loaded");
}
