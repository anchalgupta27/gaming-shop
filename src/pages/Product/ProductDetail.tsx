import { useProduct } from "./ProductDetail.hooks";
import { useNavigate } from "react-router";

const ProductDetail: React.FC = () => {
  const {
    product,
    size,
    color,
    handleColor,
    handleSize,
    handleAddToCart,
    isLoading,
    error,
  } = useProduct();

  const navigate = useNavigate(); // Initialize the navigate function

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg mt-10">Error loading product</div>;
  }

  if (!product._id) {
    return <div className="text-center text-gray-600 text-lg mt-10">Product not found</div>;
  }

  const handleAddToCartAndUpdateStock = async (name: string, price: number) => {
    await handleAddToCart(name, price); // Add the product to the cart
    product.stock -= 1; // Optimistically update stock in the UI
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-lg rounded-2xl mt-10">
      {/* Back Button */}
      <div className="col-span-2 mb-6">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg w-fit mb-4"
        >
          <span>&larr;</span> Back
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full flex justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-contain rounded-xl border bg-gray-50"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-3 leading-relaxed">{product.description}</p>

          {/* Size Options */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Available Sizes:</p>
            <div className="flex flex-wrap gap-2">
              {product.size.map((s: string) => (
                <button
                  key={s}
                  onClick={() => handleSize(s)}
                  className={`px-4 py-2 rounded-lg text-sm border transition 
                    ${size === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Colors:</p>
            <div className="flex flex-wrap gap-2">
              {product.color.map((c: string) => (
                <button
                  key={c}
                  onClick={() => handleColor(c)}
                  className={`px-4 py-2 rounded-lg text-sm border transition 
                    ${color === c ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing + Add to Cart */}
        <div className="mt-8">
          <p className="text-3xl font-bold text-blue-600 mb-2">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
          <button
            onClick={() => handleAddToCartAndUpdateStock(product.name, product.price)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
