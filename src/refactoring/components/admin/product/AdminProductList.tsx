import { useState } from "react";
import { Product } from "../../../../types";
import { AdminEditProduct } from "./AdminEditProduct";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

export const AdminProductList = ({ products, onProductUpdate }: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }

      return newSet;
    });
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div
          key={product.id}
          data-testid={`product-${index + 1}`}
          className="bg-white p-4 rounded shadow"
        >
          <button
            data-testid="toggle-button"
            onClick={() => toggleProductAccordion(product.id)}
            className="w-full text-left font-semibold"
          >
            {product.name} - {product.price}원 (재고: {product.stock})
          </button>
          {openProductIds.has(product.id) && (
            <AdminEditProduct
              product={product}
              products={products}
              onProductUpdate={onProductUpdate}
            />
          )}
        </div>
      ))}
    </div>
  );
};
