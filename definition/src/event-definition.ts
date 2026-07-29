export interface EventDefinitionSpec {
  eventName: string;
  eventType: string;
  domain?: string;
  inputs: Record<string, never>;
  payload: Record<string, never>;
}

export function defineEvent(spec: EventDefinitionSpec) {
  return {
    schema: {
      eventName: spec.eventName,
      eventType: spec.eventType,
      domain: spec.domain,
    },
  };
}
