// src/event-utils.ts

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}
