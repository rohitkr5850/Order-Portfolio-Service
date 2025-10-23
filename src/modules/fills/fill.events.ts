import EventEmitter from "events";

export const fillEvents = new EventEmitter();

export const FILL_EVENTS = {
  APPLIED: "fill.applied"
};
