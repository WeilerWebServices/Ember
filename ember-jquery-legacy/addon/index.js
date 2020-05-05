export function normalizeEvent(e) {
  if (e instanceof Event) {
    return e;
  }
  // __originalEvent is a private escape hatch of Ember's EventDispatcher to allow accessing `originalEvent` without
  // triggering a deprecation message.
  return e.__originalEvent || e.originalEvent;
}
