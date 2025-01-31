interface DiscountRule {
  description: string;
  condition: (quantity: number, total?: number) => boolean;
  discount: number;
}

/**
 * Array of discount rules used for calculating service discounts.
 * Each rule contains a description, a condition function, and a discount percentage.
 * Rules are evaluated in order, with the first matching rule being applied.
 *
 * The rules are:
 * 1. 5% off for 2+ services with total >= 1500
 * 2. 5% off for 5+ products
 * 3. 3% off for 3+ products
 * 4. 3% off for 2+ services
 *
 * @type {DiscountRule[]}
 * @constant
 */
export const DISCOUNT_RULES: DiscountRule[] = [
  {
    description: '5% discount for 2 or more services and total >= 1500',
    condition: (quantity, total = 0) => total >= 1500 && quantity >= 2,
    discount: 0.05
  },
  { description: '5% discount for 5 or more products', condition: (quantity) => quantity >= 5, discount: 0.05 },
  { description: '3% discount for 3 or more products', condition: (quantity) => quantity >= 3, discount: 0.03 },
  { description: '3% discount for 2 or more services', condition: (quantity) => quantity >= 2, discount: 0.03 }
];
