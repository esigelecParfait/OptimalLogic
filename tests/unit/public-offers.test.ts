import { describe, expect, it } from "vitest";

import {
  formatDatabasePrice,
  isPublicOfferCode,
  PUBLIC_OFFER_CODES,
} from "@/lib/offers/public-catalog";

describe("public offer catalog", () => {
  it("exposes exactly five stable database codes", () => {
    expect(PUBLIC_OFFER_CODES).toHaveLength(5);
    expect(new Set(PUBLIC_OFFER_CODES).size).toBe(5);
  });

  it("rejects an offer outside the public selection", () => {
    expect(isPublicOfferCode("startup_growth")).toBe(false);
    expect(isPublicOfferCode("startup_launch")).toBe(true);
  });

  it("never converts an absent database price to zero euro", () => {
    expect(formatDatabasePrice(null)).toBeNull();
    expect(formatDatabasePrice(0)).toBe("0 €");
    expect(formatDatabasePrice("1490", "month")).toBe("1 490 € / mois");
  });
});
