import { fingerprint } from "./fingerprint";

export interface InputMarker<Value, Required extends boolean> {
  required: Required;
  readonly value?: Value;
}

export function input<Value>(): InputMarker<Value, true> {
  return { required: true };
}

export function optionalInput<Value>(): InputMarker<Value, false> {
  return { required: false };
}

export type InputMap = Record<string, InputMarker<unknown, boolean>>;

export type PayloadFieldSpec<Inputs extends InputMap> = {
  [Name in keyof Inputs & string]: {
    from: Name;
    attr: keyof NonNullable<Inputs[Name]["value"]> & string;
    required?: boolean;
  };
}[keyof Inputs & string];

export interface PayloadField {
  name: string;
  from: string;
  attr: string;
  required: boolean;
}

export interface EventDefinitionSpec<Inputs extends InputMap> {
  eventName: string;
  eventType: string;
  domain?: string;
  inputs: Inputs;
  payload: Record<string, PayloadFieldSpec<Inputs>>;
}

export function defineEvent<Inputs extends InputMap>(
  spec: EventDefinitionSpec<Inputs>,
) {
  const schema = {
    eventName: spec.eventName,
    eventType: spec.eventType,
    domain: spec.domain,
    requiredInputs: namesOfInputs(spec.inputs, true),
    optionalInputs: namesOfInputs(spec.inputs, false),
    payloadFields: compilePayloadFields(spec.payload),
  };

  return { schema: { ...schema, fingerprint: fingerprint(schema) } };
}

function compilePayloadFields(
  payload: Record<string, { from: string; attr: string; required?: boolean }>,
): PayloadField[] {
  return Object.entries(payload).map(([name, field]) => ({
    name,
    from: field.from,
    attr: field.attr,
    required: field.required ?? true,
  }));
}

function namesOfInputs(inputs: InputMap, required: boolean): string[] {
  return Object.keys(inputs).filter(
    (name) => inputs[name]?.required === required,
  );
}
