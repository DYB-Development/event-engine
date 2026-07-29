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
});
