// modules/events/eventPublisher.ts
import { eventBus } from "./eventBus";
import type { AppEvent } from "./event.types";

export const publishEvent = <T>(event: AppEvent, payload: T) => {
  console.log(`[EVENT] ${event}`, payload);
  eventBus.publish(event, payload);
};
