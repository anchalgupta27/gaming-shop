import { baseURL } from "../../BaseUrl"; // adjust the import as needed

export type CartProduct = {
  userId: string;
  productId: string;
  name: string; 
  price: number;
  size: string;
  quantity: number;
  color: string;
};

export class CartRepository {
  static async addProductToCart(cartProduct: CartProduct) {
    console.log("Priduct",cartProduct);
    try {
      const response = await fetch(`${baseURL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartProduct),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to cart");
      }

      return data; 
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }

  static async getAllCartItems(userId: string) {
    console.log("here")
   const res = await fetch(`${baseURL}/api/cart/${userId}`);
   console.log(userId);
   return await res.json();
  }
}
