import { describe, expect, it } from "vitest";
import { bagsNeeded, slabCuFt } from "./calc";

describe("slabCuFt + bagsNeeded (80 lb bags)", () => {
  it("10x10 slab at 4 inches needs 62 bags", () => {
    expect(bagsNeeded(slabCuFt(10, 10, 4), 80)).toBe(62);
  });

  it("12x12 slab at 4 inches needs 88 bags", () => {
    expect(bagsNeeded(slabCuFt(12, 12, 4), 80)).toBe(88);
  });

  it("6x6 slab at 4 inches needs 22 bags", () => {
    expect(bagsNeeded(slabCuFt(6, 6, 4), 80)).toBe(22);
  });

  it("24x24 slab at 4 inches needs 352 bags", () => {
    expect(bagsNeeded(slabCuFt(24, 24, 4), 80)).toBe(352);
  });
});
