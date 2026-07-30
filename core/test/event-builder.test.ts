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

  it("carries the whole input when the field declares no attr", () => {
    const built = buildEvent({
      schema: {
        ...leadCreated,
        requiredInputs: ["score"],
        payloadFields: [{ name: "score", from: "score", required: true }],
      },
      inputs: { score: 99 },
    });

    expect(built.payload).toEqual({ score: 99 });
  });

  it("omits an optional field whose input was not supplied", () => {
    const built = buildEvent({
      schema: {
        ...leadCreated,
        requiredInputs: [],
        optionalInputs: ["campaign"],
        payloadFields: [
          { name: "slug", from: "campaign", attr: "slug", required: false },
        ],
      },
      inputs: {},
    });

    expect(Object.keys(built.payload)).toEqual([]);
  });

  it("rejects inputs that omit a required one", () => {
    expect(() => buildEvent({ schema: leadCreated, inputs: {} })).toThrow(
      "missing required input: lead",
    );
  });

  it("rejects an input the schema never declared", () => {
    expect(() =>
      buildEvent({
        schema: leadCreated,
        inputs: { lead: { id: 42 }, intruder: {} },
      }),
    ).toThrow("unknown input: intruder");
  });
});
