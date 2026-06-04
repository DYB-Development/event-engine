import { describe, it, expect } from "vitest";
import { resolveInputs, type Stat } from "../src/stat";

const Revenue: Stat = {
  key: "revenue",
  title: "Revenue",
  definition: "Total revenue for the account.",
  unit: "currency",
  timeframe: "mtd",
  inputs: {
    accountId: {
      key: "accountId",
      required: true,
      validate: (value): value is string => typeof value === "string",
    },
  },
};

describe("resolveInputs", () => {
  it("resolves a present required input", () => {
    expect(resolveInputs(Revenue, { accountId: "a1" })).toEqual({
      accountId: "a1",
    });
  });
});
