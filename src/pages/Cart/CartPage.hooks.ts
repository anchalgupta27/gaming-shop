import { useQuery } from "@tanstack/react-query";
import { CartUsecase } from "../../features/usecase/CartUsecase";
import { AuthRepository } from "../../features/repository/AuthRepository";
import { useState } from "react";
import { OrderUsecase } from "../../features/usecase/OrderUsecase";

export function useCarts() {

    const [isModalOpen, setModalOpen] = useState(false);

    const storedUser = AuthRepository.currentUser();
    const userId = storedUser?.userId!
    console.log(userId);
    const {data} = useQuery({
        queryKey: ["CartUsecase", "getAllCartItems", "userId"],
        queryFn: () => CartUsecase.getAllCartItems(userId),
        enabled: !!userId
    })
    

const handleCheckout = (products:[]) => {
  if (products.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  setModalOpen(true);
};

const confirmCheckout = async () => {
  try {
    await OrderUsecase.addToCheckout(userId);
  } catch (err) {
    alert("Checkout failed.");
  } finally {
    setModalOpen(false);
  }
};


    return {
        cartItems: data ?? {},
        isModalOpen,
        setModalOpen,
        handleCheckout,
        confirmCheckout
    }
}