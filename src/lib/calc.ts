// Bag yields in cubic feet of cured concrete per bag.
export const YIELD: Record<40 | 60 | 80, number> = {
  80: 0.6,
  60: 0.45,
  40: 0.3,
};

export const WASTE = 0.1;

// Guards against float rounding pushing an exact boundary (e.g. 88.0)
// up to the next bag before Math.ceil runs.
export const EPSILON = 1e-6;

export function slabCuFt(lengthFt: number, widthFt: number, thicknessIn: number): number {
  return lengthFt * widthFt * (thicknessIn / 12);
}

export function cylinderCuFt(diameterIn: number, depthIn: number): number {
  const radiusFt = diameterIn / 2 / 12;
  return Math.PI * radiusFt * radiusFt * (depthIn / 12);
}

export function postHoleCuFt(diameterIn: number, depthIn: number, postSideIn: number): number {
  const postSideFt = postSideIn / 12;
  const postCuFt = postSideFt * postSideFt * (depthIn / 12);
  return cylinderCuFt(diameterIn, depthIn) - postCuFt;
}

export function bagsNeeded(cuFt: number, bagLb: 40 | 60 | 80): number {
  return Math.ceil((cuFt * (1 + WASTE)) / YIELD[bagLb] - EPSILON);
}
