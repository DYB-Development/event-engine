export interface CatalogPayloadField {
  name: string;
  from: string;
  attr: string;
}

export interface CatalogEntry {
  payloadFields: CatalogPayloadField[];
}

export interface BuildRequest {
  schema: CatalogEntry;
  inputs: Record<string, unknown>;
}

export function buildEvent(request: BuildRequest): {
  payload: Record<string, unknown>;
} {
  const payload: Record<string, unknown> = {};

  for (const field of request.schema.payloadFields) {
    const input = request.inputs[field.from] as Record<string, unknown>;
    payload[field.name] = input[field.attr];
  }

  return { payload };
}
