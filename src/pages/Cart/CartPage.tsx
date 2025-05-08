import React from 'react';
import { useCarts } from './CartPage.hooks';
import CheckoutModal from '../../components/CheckoutModal';

const CartPage: React.FC = () => {
  const { cartItems, isModalOpen, setModalOpen, handleCheckout, confirmCheckout } = useCarts();

  if(!cartItems && !cartItems.products) {
    return <div>
      The cart is empty
    </div>
  }
  const items = cartItems?.cart;
  const products = items?.products || [];
  const totalAmount = items?.totalAmount || 0;
  const totalQuantity = products.reduce((sum: number, item: any) => sum + item.quantity, 0);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {products.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.imageUrl || 'https://via.placeholder.com/80'}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size} | Color: {item.color}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-right font-bold">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right space-y-4">
            <p className="text-lg">Total Quantity: <span className="font-semibold">{totalQuantity}</span></p>
            <p className="text-xl font-bold">Total: ₹{totalAmount.toLocaleString()}</p>
            <button
              onClick={() => handleCheckout(products)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <CheckoutModal
  isOpen={isModalOpen}
  onClose={() => setModalOpen(false)}
  onConfirm={confirmCheckout} // define this function
  totalAmount={cartItems?.cart?.totalAmount ?? 0}
/>
    </div>
  );
};

export default CartPage;
