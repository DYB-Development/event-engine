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
});
