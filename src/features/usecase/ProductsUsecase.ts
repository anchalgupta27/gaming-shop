import { ProductsRepository } from "../repository/ProductsRepository";

export class ProductsUsecase {
   static async fetchProducts() {     
        return ProductsRepository.fetchProducts();
    }
}