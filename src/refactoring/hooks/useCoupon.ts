import { Coupon } from "../../types.ts";
import { useState } from "react";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (addCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, addCoupon]);
  };

  return {
    coupons,
    addCoupon,
  };
};
