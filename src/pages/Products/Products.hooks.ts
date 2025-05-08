import { useQuery } from '@tanstack/react-query'
import { ProductsUsecase } from '../../features/usecase/ProductsUsecase'

export function useProducts() {
  const { data } = useQuery({
    queryKey: ['ProductsUsecase', 'fetchProducts'],
    queryFn: ProductsUsecase.fetchProducts,
  })

  return {
    products: data ?? [],
  }
}