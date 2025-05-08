import { CartRepository, type CartProduct } from "../repository/CartRepository";

export class CartUsecase {
  static async addProductToCart(cartProduct: CartProduct) {
    return CartRepository.addProductToCart(cartProduct);
  }

  static async getAllCartItems(userId: string) {
    console.log("usecase", userId)
    return CartRepository.getAllCartItems(userId);
  }
}