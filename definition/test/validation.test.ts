import { describe, it, expect } from "vitest";
import { validateDefinition } from "../src/validation";

describe("validateDefinition", () => {
  it("rejects a payload field named after an envelope key", () => {
    const errors = validateDefinition({
      eventName: "lead_created",
      inputs: ["lead"],
      payloadFields: [
        { name: "occurred_at", from: "lead", attr: "id", required: true },
      ],
    });

    expect(errors).toEqual([
      "payload field uses reserved name: occurred_at",
    ]);
  });

  it("rejects a payload field whose from names an undeclared input", () => {
    const errors = validateDefinition({
      eventName: "lead_created",
      inputs: ["lead"],
      payloadFields: [
        { name: "slug", from: "campaign", attr: "slug", required: true },
      ],
    });

    expect(errors).toEqual([
      "payload field slug references unknown input: campaign",
    ]);
  });

  it("rejects an event name that is not snake_case", () => {
    const errors = validateDefinition({
      eventName: "LeadCreated",
      inputs: [],
      payloadFields: [],
    });

    expect(errors).toEqual(["event name must be snake_case: LeadCreated"]);
  });

  it("rejects an input name that collides with a reserved envelope key", () => {
    const errors = validateDefinition({
      eventName: "lead_created",
      inputs: ["metadata"],
      payloadFields: [],
    });

    expect(errors).toEqual([
      "input name collides with a reserved envelope key: metadata",
    ]);
  });
});
