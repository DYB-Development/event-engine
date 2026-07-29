import { describe, it, expect } from "vitest";
import { fingerprint } from "../src/fingerprint";

const leadId = { name: "lead_id", from: "lead", attr: "id", required: true };
const email = { name: "email", from: "lead", attr: "email", required: true };

describe("fingerprint", () => {
  it("is unchanged by the order payload fields were declared in", () => {
    const declaredOneWay = fingerprint({
      eventName: "lead_created",
      eventType: "domain",
      requiredInputs: ["lead"],
      optionalInputs: [],
      payloadFields: [leadId, email],
    });
    const declaredTheOther = fingerprint({
      eventName: "lead_created",
      eventType: "domain",
      requiredInputs: ["lead"],
      optionalInputs: [],
      payloadFields: [email, leadId],
    });

    expect(declaredOneWay).toBe(declaredTheOther);
  });
});
