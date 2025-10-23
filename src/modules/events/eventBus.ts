// modules/events/eventBus.ts
type EventHandler = (payload: any) => void;

export class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  subscribe(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  publish(event: string, payload: any) {
    const listeners = this.handlers.get(event) || [];
    listeners.forEach((handler) => handler(payload));
  }
}

export const eventBus = new EventBus();
