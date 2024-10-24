import { Coupon } from "../../types";

export const applyCouponPrice = (price: number, coupon?: Coupon) => {
  if (!coupon) return price;

  const { discountType, discountValue } = coupon;

  switch (discountType) {
    case "amount":
      return Math.max(0, price - discountValue);
    case "percentage":
      return (price *= 1 - discountValue / 100);
    default:
      return price;
  }
};
