import { ProductRepository } from "../repository/ProductRepository";

export class ProductUsecase {
    static async fetchProductById(id: string) {
        return ProductRepository.fetchProductById(id)
    }
}