// Spring 2026 pricing at Home Depot / Lowe's — verify at build time (see data/pages.ts header).
export const PRICE: Record<40 | 60 | 80, number> = {
  80: 6.98,
  60: 5.98,
  40: 4.98,
};

export const PRICING_LABEL = "Spring 2026";

// Approximate bags per standard pallet, per retailer spec sheets.
export const BAGS_PER_PALLET: Record<40 | 60 | 80, number> = {
  80: 42,
  60: 56,
  40: 80,
};

export function bagCost(bagCount: number, bagLb: 40 | 60 | 80): number {
  return bagCount * PRICE[bagLb];
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2).replace(/\.00$/, "")}`;
}
