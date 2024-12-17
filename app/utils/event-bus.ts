import { ulid } from "ulid";

export class EventBus<T> {
  private eventTarget: EventTarget;
  private eventName: string;
  private listeners: Map<(event: T) => void, EventListener> = new Map();

  constructor() {
    this.eventTarget = new EventTarget();
    this.eventName = ulid();
  }

  // Subscribe to the event
  on(callback: (next: T) => void): {
    remove: () => void;
  } {
    const listener: EventListener = (event) => {
      callback((event as CustomEvent<T>).detail);
    };

    this.listeners.set(callback, listener);
    this.eventTarget.addEventListener(this.eventName, listener);

    return {
      remove: () => this.off(callback),
    };
  }

  // Emit the event
  emit(detail: T): void {
    this.eventTarget.dispatchEvent(new CustomEvent(this.eventName, { detail }));
  }

  // Unsubscribe a single listener
  off(callback: (event: T) => void): void {
    const listener = this.listeners.get(callback);
    if (listener) {
      this.eventTarget.removeEventListener(this.eventName, listener);
      this.listeners.delete(callback); // Clean up the map
    }
  }

  // Remove all subscribers
  offAll(): void {
    this.listeners.forEach((listener) => {
      this.eventTarget.removeEventListener(this.eventName, listener);
    });
    this.listeners.clear();
  }
}
