import { describe, it, expect } from "vitest";
import { defineEvent, input } from "../src/index";

interface Lead {
  id: number;
}

describe("@eventengine/definition public api", () => {
  it("compiles an event definition through the package entry", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      domain: "marketing",
      inputs: { lead: input<Lead>() },
      payload: { lead_id: { from: "lead", attr: "id" } },
    });

    expect(definition.schema.payloadFields).toEqual([
      { name: "lead_id", from: "lead", attr: "id", required: true },
    ]);
  });
});
