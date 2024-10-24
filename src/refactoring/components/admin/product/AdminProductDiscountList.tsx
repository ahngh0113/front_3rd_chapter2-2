import { Discount, Product } from "../../../../types";

interface Props {
  index: number;
  isEdit?: boolean;
  product: Product;
  discount: Discount;
  handleRemoveDiscount: (productId: string, index: number) => void;
}

export const AdminProductDiscountList = ({
  index,
  isEdit = false,
  product,
  discount,
  handleRemoveDiscount,
}: Props) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
      {isEdit && (
        <button
          onClick={() => handleRemoveDiscount(product.id, index)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      )}
    </div>
  );
};
