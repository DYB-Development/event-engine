import { createHash } from "node:crypto";
import type { PayloadField } from "./event-definition";

export interface FingerprintableSchema {
  eventName: string;
  eventType: string;
  requiredInputs: string[];
  optionalInputs: string[];
  payloadFields: PayloadField[];
}

export function fingerprint(schema: FingerprintableSchema): string {
  return createHash("sha256")
    .update(canonicalRepresentation(schema))
    .digest("hex");
}

function canonicalRepresentation(schema: FingerprintableSchema): string {
  return JSON.stringify({
    eventName: schema.eventName,
    eventType: schema.eventType,
    requiredInputs: [...schema.requiredInputs].sort(),
    optionalInputs: [...schema.optionalInputs].sort(),
    payloadFields: [...schema.payloadFields]
      .map((field) => ({
        name: field.name,
        from: field.from,
        attr: field.attr,
        required: String(field.required),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  });
}
