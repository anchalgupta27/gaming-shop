import React from 'react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg hover:scale-[1.02] transform duration-300 h-full flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.name}</h2>
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}
        <div className="mt-auto text-lg font-bold text-blue-600">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
