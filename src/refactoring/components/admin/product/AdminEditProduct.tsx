import { useMemo, useState } from "react";
import { Discount, Product } from "../../../../types";
import { AdminProductDiscountList } from "./AdminProductDiscountList";

interface Props {
  product: Product;
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

export const AdminEditProduct = ({
  product,
  products,
  onProductUpdate,
}: Props) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const isEdit = useMemo(() => {
    return editingProduct?.id === product.id;
  }, [editingProduct]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };

      setEditingProduct(updatedProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };

      setEditingProduct(updatedProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);

    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };

      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);

    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };

      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);

    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return (
    <div className="mt-2">
      {isEdit ? (
        <div>
          <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
              type="text"
              value={editingProduct?.name}
              onChange={(e) =>
                handleProductNameUpdate(product.id, e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">가격: </label>
            <input
              type="number"
              value={editingProduct?.price}
              onChange={(e) =>
                handlePriceUpdate(product.id, parseInt(e.target.value))
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">재고: </label>
            <input
              type="number"
              value={editingProduct?.stock}
              onChange={(e) =>
                handleStockUpdate(product.id, parseInt(e.target.value))
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
            {editingProduct?.discounts.map((discount, index) => (
              <AdminProductDiscountList
                isEdit
                key={index}
                index={index}
                product={product}
                discount={discount}
                handleRemoveDiscount={handleRemoveDiscount}
              />
            ))}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="수량"
                value={newDiscount.quantity}
                onChange={(e) =>
                  setNewDiscount({
                    ...newDiscount,
                    quantity: parseInt(e.target.value),
                  })
                }
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="할인율 (%)"
                value={newDiscount.rate * 100}
                onChange={(e) =>
                  setNewDiscount({
                    ...newDiscount,
                    rate: parseInt(e.target.value) / 100,
                  })
                }
                className="w-1/3 p-2 border rounded"
              />
              <button
                onClick={() => handleAddDiscount(product.id)}
                className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                할인 추가
              </button>
            </div>
          </div>
          <button
            onClick={handleEditComplete}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          {product.discounts.map((discount, index) => (
            <AdminProductDiscountList
              key={index}
              index={index}
              product={product}
              discount={discount}
              handleRemoveDiscount={handleRemoveDiscount}
            />
          ))}
          <button
            data-testid="modify-button"
            onClick={() => handleEditProduct(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};
