import type { Stat } from "./stat";
import type { StatResult } from "./result";

type Resolver = (inputs: Record<string, unknown>) => StatResult;

export interface StatSource {
  resolve(stat: Stat, inputs: Record<string, unknown>): Promise<StatResult>;
}

export class InMemoryStatSource implements StatSource {
  private readonly resolvers = new Map<string, Resolver>();

  define(key: string, resolver: Resolver): void {
    this.resolvers.set(key, resolver);
  }

  async resolve(
    stat: Stat,
    inputs: Record<string, unknown>,
  ): Promise<StatResult> {
    const resolver = this.resolvers.get(stat.key);
    return resolver!(inputs);
  }
}
