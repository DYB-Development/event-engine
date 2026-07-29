export interface EventDefinitionSpec {
  eventName: string;
  eventType: string;
  inputs: Record<string, never>;
  payload: Record<string, never>;
}

export function defineEvent(spec: EventDefinitionSpec) {
  return {
    schema: {
      eventName: spec.eventName,
    },
  };
}
