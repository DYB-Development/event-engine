import type { StoredEvent } from "@stats/store";

export type MeasureKind = "additive" | "semi_additive" | "holistic" | "cohort";

export interface Measure {
  key: string;
  kind: MeasureKind;
  compute(events: StoredEvent[]): number;
}

export function additive(
  key: string,
  valueOf: (event: StoredEvent) => number,
): Measure {
  return {
    key,
    kind: "additive",
    compute(events) {
      return events.reduce((sum, event) => sum + valueOf(event), 0);
    },
  };
}

export function latest(
  key: string,
  valueOf: (event: StoredEvent) => number,
): Measure {
  return {
    key,
    kind: "semi_additive",
    compute(events) {
      if (events.length === 0) return 0;
      const newest = events.reduce((a, b) =>
        a.occurredAt >= b.occurredAt ? a : b,
      );
      return valueOf(newest);
    },
  };
}
