import { describe, it, expect } from "vitest";
import { mergeSchema } from "../src/schema";

describe("mergeSchema", () => {
  it("assigns version 1 to a new event", () => {
    expect(mergeSchema([{ name: "order.placed", shape: "x" }], [])).toEqual([
      { name: "order.placed", version: 1, shape: "x" },
    ]);
  });
});
