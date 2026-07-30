import { describe, it, expect } from "vitest";
import { buildEvent } from "../src/event-builder";

const leadCreated = {
  eventName: "lead_created",
  eventType: "domain",
  eventVersion: 1,
  requiredInputs: ["lead"],
  optionalInputs: [],
  payloadFields: [
    { name: "lead_id", from: "lead", attr: "id", required: true },
  ],
};

describe("buildEvent", () => {
  it("reads a payload field off the input its from names", () => {
    const built = buildEvent({
      schema: leadCreated,
      inputs: { lead: { id: 42 } },
    });

    expect(built.payload).toEqual({ lead_id: 42 });
  });
});
