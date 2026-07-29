import { describe, it, expect } from "vitest";
import { defineEvent } from "../src/event-definition";

describe("defineEvent", () => {
  it("compiles the event name into the schema", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      inputs: {},
      payload: {},
    });

    expect(definition.schema.eventName).toBe("lead_created");
  });

  it("compiles the event type into the schema", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      inputs: {},
      payload: {},
    });

    expect(definition.schema.eventType).toBe("domain");
  });

  it("compiles the domain into the schema", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      domain: "marketing",
      inputs: {},
      payload: {},
    });

    expect(definition.schema.domain).toBe("marketing");
  });
});
