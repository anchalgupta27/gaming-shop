import { baseURL } from "../../BaseUrl";

export class ProductRepository {
    static async fetchProductById(id: string) {
        const res = await fetch(`${baseURL}/api/products/${id}`);
        return await res.json();
    }
}