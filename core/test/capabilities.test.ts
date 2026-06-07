import { describe, it, expect } from "vitest";
import { Level } from "../src/event";
import { capabilitiesFor } from "../src/capabilities";

describe("capabilitiesFor", () => {
  it("resolves delivery capabilities for each level", () => {
    expect([
      capabilitiesFor(Level.InProcess),
      capabilitiesFor(Level.Background),
      capabilitiesFor(Level.Outbox),
      capabilitiesFor(Level.Broker),
    ]).toEqual([
      { backgrounded: false, durable: false, broker: false },
      { backgrounded: true, durable: false, broker: false },
      { backgrounded: true, durable: true, broker: false },
      { backgrounded: true, durable: true, broker: true },
    ]);
  });
});
