import { describe, it, expect } from "vitest";
import { defineEvent, input, optionalInput } from "../src/event-definition";

interface Lead {
  id: number;
  email: string;
  company: string | null;
}

interface Campaign {
  slug: string;
}

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

  it("lists a declared input as required", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      inputs: { lead: input<Lead>() },
      payload: {},
    });

    expect(definition.schema.requiredInputs).toEqual(["lead"]);
  });

  it("lists an optional input separately from the required ones", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      inputs: { lead: input<Lead>(), campaign: optionalInput<Campaign>() },
      payload: {},
    });

    expect(definition.schema.optionalInputs).toEqual(["campaign"]);
  });

  it("compiles a payload field's source mapping into the schema", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      inputs: { lead: input<Lead>() },
      payload: { lead_id: { from: "lead", attr: "id" } },
    });

    expect(definition.schema.payloadFields).toEqual([
      { name: "lead_id", from: "lead", attr: "id", required: true },
    ]);
  });

  it("marks a payload field declared with required false as optional", () => {
    const definition = defineEvent({
      eventName: "lead_created",
      eventType: "domain",
      inputs: { lead: input<Lead>() },
      payload: { company: { from: "lead", attr: "company", required: false } },
    });

    expect(definition.schema.payloadFields).toEqual([
      { name: "company", from: "lead", attr: "company", required: false },
    ]);
  });
});
