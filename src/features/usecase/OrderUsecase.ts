import { OrderRepository } from "../repository/OrderRepository"

export class OrderUsecase {
    static async addToCheckout( userId: string ) {
        try {
            await OrderRepository.addToCheckout(userId)
        } catch (error) {
            throw error
        }
    }
}