import React from 'react'
import { useProducts } from './Products.hooks'
import ProductCard from '../../components/ProductCard'
import { Link } from 'react-router'

 const ProductsPage: React.FC = () => {
  const { products } = useProducts()

  if (!products) {
    return null
  }

  return (
    <div>
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product: any, index: any) => (
        <Link to={`/products/${product._id}`}><ProductCard product={product} key={index} /></Link>
      ))}
    </div>
      </div>
    </div>
  )
}

export default ProductsPage;