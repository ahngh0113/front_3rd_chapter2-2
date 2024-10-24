import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const addProduct = (addProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, addProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
