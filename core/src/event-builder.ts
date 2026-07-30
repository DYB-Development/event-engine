export interface CatalogPayloadField {
  name: string;
  from: string;
  attr?: string;
  required: boolean;
}

export interface CatalogEntry {
  eventName: string;
  eventType: string;
  eventVersion: number;
  requiredInputs: string[];
  optionalInputs: string[];
  payloadFields: CatalogPayloadField[];
}

export interface BuildRequest {
  schema: CatalogEntry;
  inputs: Record<string, unknown>;
}

export interface BuiltEvent {
  eventName: string;
  eventType: string;
  eventVersion: number;
  payload: Record<string, unknown>;
}

export function buildEvent(request: BuildRequest): BuiltEvent {
  assertInputsSatisfy(request.schema, request.inputs);

  const payload: Record<string, unknown> = {};

  for (const field of request.schema.payloadFields) {
    const input = request.inputs[field.from];
    if (input == null && !field.required) {
      continue;
    }

    payload[field.name] = field.attr
      ? (input as Record<string, unknown>)[field.attr]
      : input;
  }

  return {
    eventName: request.schema.eventName,
    eventType: request.schema.eventType,
    eventVersion: request.schema.eventVersion,
    payload,
  };
}

function assertInputsSatisfy(
  schema: CatalogEntry,
  inputs: Record<string, unknown>,
): void {
  const supplied = Object.keys(inputs);
  const missing = schema.requiredInputs.filter(
    (name) => !supplied.includes(name),
  );

  if (missing.length > 0) {
    throw new Error(`missing required input: ${missing.join(", ")}`);
  }

  const declared = [...schema.requiredInputs, ...schema.optionalInputs];
  const unknown = supplied.filter((name) => !declared.includes(name));

  if (unknown.length > 0) {
    throw new Error(`unknown input: ${unknown.join(", ")}`);
  }
}
