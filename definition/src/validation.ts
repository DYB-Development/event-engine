import type { PayloadField } from "./event-definition";

export const RESERVED_PAYLOAD_FIELDS = [
  "event_name",
  "event_type",
  "event_version",
  "occurred_at",
  "created_at",
  "updated_at",
  "published_at",
  "metadata",
  "idempotency_key",
  "attempts",
  "dead_lettered_at",
  "aggregate_type",
  "aggregate_id",
  "aggregate_version",
] as const;

export interface ValidatableDefinition {
  eventName: string;
  inputs: string[];
  payloadFields: PayloadField[];
}

export function validateDefinition(
  definition: ValidatableDefinition,
): string[] {
  return [
    ...eventNameErrors(definition.eventName),
    ...definition.payloadFields.flatMap((field) => [
      ...reservedNameErrors(field),
      ...unknownInputErrors(field, definition.inputs),
    ]),
  ];
}

const SNAKE_CASE = /^[a-z][a-z0-9_]*$/;

function eventNameErrors(eventName: string): string[] {
  if (SNAKE_CASE.test(eventName)) {
    return [];
  }
  return [`event name must be snake_case: ${eventName}`];
}

function unknownInputErrors(field: PayloadField, inputs: string[]): string[] {
  if (inputs.includes(field.from)) {
    return [];
  }
  return [`payload field ${field.name} references unknown input: ${field.from}`];
}

function reservedNameErrors(field: PayloadField): string[] {
  if (!RESERVED_PAYLOAD_FIELDS.includes(field.name as never)) {
    return [];
  }
  return [`payload field uses reserved name: ${field.name}`];
}
