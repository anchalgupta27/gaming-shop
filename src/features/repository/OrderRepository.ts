import { baseURL } from "../../BaseUrl";

export class OrderRepository {
    static async addToCheckout( userId: string ) {
        try {
            const response = await fetch(`${baseURL}/api/cart/checkout`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId }),
              });
              
              if (!response.ok) {
                throw new Error('Checkout failed');
              }
              
            await response.json();
            alert("Order placed successfully!");
            // updateCart(), navigate, etc.
          } catch (err) {
             throw err
          } 
    }
}

