import { Coupon, Product } from "../../types.ts";
import { CartCouponList } from "../components/cart/CartCouponList.tsx";
import { CartList } from "../components/cart/CartList.tsx";
import { CartTotalPrice } from "../components/cart/CartTotalPrice.tsx";
import { CartProductList } from "../components/cart/CartProductList.tsx";
import { useCart } from "../hooks";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <CartProductList
            products={products}
            cart={cart}
            addToCart={addToCart}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartList
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />

          <CartCouponList
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
          />
          <CartTotalPrice calculateTotal={calculateTotal} />
        </div>
      </div>
    </div>
  );
};
