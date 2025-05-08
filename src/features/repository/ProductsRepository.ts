import { baseURL } from "../../BaseUrl";

export class ProductsRepository {
    static async fetchProducts() {
         const res = await fetch(`${baseURL}/api/products`);
        return await res.json();
     }
 }