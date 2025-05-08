import React from 'react'
import { useProducts } from './Products.hooks'
import ProductCard from '../../components/ProductCard'
import { Link } from 'react-router'

const ProductsPage: React.FC = () => {
  const { products } = useProducts()

  if (!products) return <div className="text-center mt-10 text-gray-500">Loading products...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="transform transition-transform hover:scale-105"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
