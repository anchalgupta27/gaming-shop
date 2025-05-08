import { useProduct } from "./ProductDetail.hooks";

const ProductDetail: React.FC = () => {
  const { product, size, color, handleColor, handleSize, handleAddToCart
    
  } = useProduct();

  if (!product._id) {
    return <div className="text-center text-gray-600 text-lg mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl mt-10">
      {/* Product Image */}
      <div className="w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-contain rounded-xl border"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Available Sizes:</p>
            <div className="flex gap-2 mt-1">
              {product.size.map((s: string) => (
                <span
                  key={s}
                  onClick={() => handleSize(s)} // Handle size selection
                  className={`px-3 py-1 rounded-full text-sm border cursor-pointer 
                    ${size === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Colors:</p>
            <div className="flex gap-2 mt-1">
              {product.color.map((c: string) => (
                <span
                  key={c}
                  onClick={() => handleColor(c)} // Handle color selection
                  className={`px-3 py-1 rounded-full text-sm border cursor-pointer 
                    ${color === c ? 'bg-blue-200' : 'bg-gray-200'}`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing + Action */}
        <div className="mt-6">
          <p className="text-3xl font-bold text-blue-600 mb-2">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
          <button onClick={() => handleAddToCart(product.name, product.price)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
