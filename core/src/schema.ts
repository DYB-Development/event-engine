export interface SchemaEntry {
  name: string;
  version: number;
  shape: string;
}

export interface DeclaredEvent {
  name: string;
  shape: string;
}

export function mergeSchema(
  declared: DeclaredEvent[],
  committed: SchemaEntry[],
): SchemaEntry[] {
  const result = [...committed];
  for (const event of declared) {
    const versions = committed.filter((entry) => entry.name === event.name);
    if (versions.length === 0) {
      result.push({ name: event.name, version: 1, shape: event.shape });
    }
  }
  return result;
}
