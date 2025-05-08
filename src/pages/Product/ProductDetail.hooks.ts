import { useQuery } from "@tanstack/react-query";
import { ProductUsecase } from "../../features/usecase/ProductUsecase";
import { useParams } from "react-router";
import { useCallback, useState } from "react";
import { AuthRepository } from "../../features/repository/AuthRepository";
import { CartRepository } from "../../features/repository/CartRepository";

type ProductParam = { id: string };

export function useProduct() {
  const { id } = useParams<ProductParam>();
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();

  if (!id) {
    throw new Error("Product ID is missing from the URL");
  }

  const handleSize = useCallback((size: string) => {
    setSize(size);
  }, []);

  const handleColor = useCallback((color: string) => {
    setColor(color);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['ProductUsecase', 'fetchProductById', id],
    queryFn: () => ProductUsecase.fetchProductById(id),
    enabled: !!id
  });

  const handleAddToCart = useCallback(async (name: string, price: number) => {
    const storedUser = AuthRepository.currentUser();

    if (!storedUser?.userId || !size || !color || !name) {
      window.alert("Please check size and color");
      return;
    }

    const userId = storedUser?.userId!;

    await CartRepository.addProductToCart({
      userId,
      productId: id,
      size: size,
      color: color,
      quantity: 1,
      name,
      price
    });

    // You could add more feedback here, e.g., updating local stock
    alert(`${name} has been added to your cart.`);
  }, [size, color, id]);

  return {
    product: data ?? {},
    error,
    isLoading,
    handleColor,
    handleSize,
    size,
    color,
    handleAddToCart
  };
}
