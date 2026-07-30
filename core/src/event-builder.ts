export interface CatalogPayloadField {
  name: string;
  from: string;
  attr?: string;
  required: boolean;
}

export interface CatalogEntry {
  requiredInputs: string[];
  payloadFields: CatalogPayloadField[];
}

export interface BuildRequest {
  schema: CatalogEntry;
  inputs: Record<string, unknown>;
}

export function buildEvent(request: BuildRequest): {
  payload: Record<string, unknown>;
} {
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

  return { payload };
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
}
