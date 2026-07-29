export interface InputMarker<Value, Required extends boolean> {
  required: Required;
  readonly value?: Value;
}

export function input<Value>(): InputMarker<Value, true> {
  return { required: true };
}

export type InputMap = Record<string, InputMarker<unknown, boolean>>;

export interface EventDefinitionSpec<Inputs extends InputMap> {
  eventName: string;
  eventType: string;
  domain?: string;
  inputs: Inputs;
  payload: Record<string, never>;
}

export function defineEvent<Inputs extends InputMap>(
  spec: EventDefinitionSpec<Inputs>,
) {
  return {
    schema: {
      eventName: spec.eventName,
      eventType: spec.eventType,
      domain: spec.domain,
      requiredInputs: namesOfInputs(spec.inputs, true),
    },
  };
}

function namesOfInputs(inputs: InputMap, required: boolean): string[] {
  return Object.keys(inputs).filter(
    (name) => inputs[name]?.required === required,
  );
}
