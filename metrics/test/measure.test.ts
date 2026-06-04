import { describe, it, expect } from "vitest";
import type { StoredEvent } from "@stats/store";
import { additive, latest } from "../src/measure";

describe("additive", () => {
  it("sums the extracted value over events", () => {
    const events: StoredEvent[] = [
      { name: "scored", occurredAt: "t1", payload: 3 },
      { name: "scored", occurredAt: "t2", payload: 4 },
    ];
    const points = additive("points", (event) => event.payload as number);
    expect(points.compute(events)).toBe(7);
  });
});

describe("latest", () => {
  it("returns the value of the most recent event", () => {
    const events: StoredEvent[] = [
      { name: "balance", occurredAt: "2026-01-01T00:00:00Z", payload: 100 },
      { name: "balance", occurredAt: "2026-01-03T00:00:00Z", payload: 250 },
      { name: "balance", occurredAt: "2026-01-02T00:00:00Z", payload: 175 },
    ];
    const balance = latest("balance", (event) => event.payload as number);
    expect(balance.compute(events)).toBe(250);
  });
});
