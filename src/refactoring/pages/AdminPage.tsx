import { Coupon, Product } from "../../types.ts";
import { AdminProductList } from "../components/admin/product/AdminProductList.tsx";
import { AdminCouponList } from "../components/admin/coupon/AdminCouponList.tsx";
import { AdminAddProduct } from "../components/admin/product/AdminAddProduct.tsx";
import { AdminAddCoupon } from "../components/admin/coupon/AdminAddCoupon.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <AdminAddProduct onProductAdd={onProductAdd} />
          <AdminProductList
            products={products}
            onProductUpdate={onProductUpdate}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <AdminAddCoupon onCouponAdd={onCouponAdd} />
            <AdminCouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
