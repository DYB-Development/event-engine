import { describe, it, expect } from "vitest";
import { Level, capabilitiesFor, type Subscriber } from "@event-engine/core";
import { InlineJobQueue } from "@event-engine/ports";
import { Delivery, UnsupportedLevelError } from "../src/delivery";
import type { OutboxEvent } from "../src/outbox";

const noOutbox = { emit: async () => undefined };

function dispatched(name: string, level: Level, payload: unknown = 1) {
  return {
    name,
    level,
    capabilities: capabilitiesFor(level),
    payload,
    occurredAt: "t",
  };
}

describe("Delivery", () => {
  it("runs subscribers synchronously for in-process events", async () => {
    const ran: string[] = [];
    const subscriber: Subscriber = (event) => {
      ran.push(event.name);
    };
    const delivery = new Delivery({
      subscribersFor: (name) => (name === "user.signup" ? [subscriber] : []),
      outbox: noOutbox,
    });
    await delivery.handler()(dispatched("user.signup", Level.InProcess, {}));
    expect(ran).toEqual(["user.signup"]);
  });

  it("sends durable events to the outbox", async () => {
    const emitted: OutboxEvent[] = [];
    const delivery = new Delivery({
      subscribersFor: () => [],
      outbox: {
        emit: async (event) => {
          emitted.push(event);
        },
      },
    });
    await delivery.handler()(dispatched("invoice.paid", Level.Outbox));
    expect(emitted.map((event) => event.name)).toEqual(["invoice.paid"]);
  });

  it("dispatches subscribers via a background job for background events", async () => {
    const ran: string[] = [];
    const subscriber: Subscriber = (event) => {
      ran.push(event.name);
    };
    const delivery = new Delivery({
      subscribersFor: (name) => (name === "x" ? [subscriber] : []),
      outbox: noOutbox,
      jobs: new InlineJobQueue(),
    });
    await delivery.handler()(dispatched("x", Level.Background));
    expect(ran).toEqual(["x"]);
  });

  it("routes on capabilities rather than the level", async () => {
    const emitted: OutboxEvent[] = [];
    const delivery = new Delivery({
      subscribersFor: () => [],
      outbox: {
        emit: async (event) => {
          emitted.push(event);
        },
      },
    });
    await delivery.handler()({
      name: "invoice.paid",
      level: Level.InProcess,
      capabilities: { backgrounded: true, durable: true, broker: false },
      payload: 1,
      occurredAt: "t",
    });
    expect(emitted.map((event) => event.name)).toEqual(["invoice.paid"]);
  });

  it("rejects event-sourcing level events", async () => {
    const delivery = new Delivery({
      subscribersFor: () => [],
      outbox: noOutbox,
    });
    let caught: unknown;
    try {
      await delivery.handler()(dispatched("x", Level.EventSourcing));
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(UnsupportedLevelError);
  });
});
