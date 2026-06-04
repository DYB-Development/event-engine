import { describe, it, expect } from "vitest";
import { InMemoryAppendOnlyStore } from "@stats/ports";
import { EventStore, type StoredEvent } from "../src/event-store";

describe("EventStore", () => {
  it("returns appended events in order", async () => {
    const log = new InMemoryAppendOnlyStore<StoredEvent>();
    const store = new EventStore(log);
    const first: StoredEvent = { name: "a", occurredAt: "t1", payload: 1 };
    const second: StoredEvent = { name: "b", occurredAt: "t2", payload: 2 };
    await store.append(first);
    await store.append(second);
    expect(await store.all()).toEqual([first, second]);
  });

  it("returns events beyond a single page", async () => {
    const log = new InMemoryAppendOnlyStore<StoredEvent>();
    const store = new EventStore(log);
    for (let i = 0; i < 250; i++) {
      await store.append({ name: "tick", occurredAt: "t", payload: i });
    }
    expect(await store.all()).toHaveLength(250);
  });

  it("delivers an appended event to a subscribed projection", async () => {
    const log = new InMemoryAppendOnlyStore<StoredEvent>();
    const store = new EventStore(log);
    const seen: StoredEvent[] = [];
    store.subscribe((event) => {
      seen.push(event);
    });
    const event: StoredEvent = { name: "a", occurredAt: "t", payload: 1 };
    await store.append(event);
    expect(seen).toEqual([event]);
  });
});
