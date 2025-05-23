// components/CheckoutModal.tsx
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
};

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, totalAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Adjust opacity here */}

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-md w-96 z-10">
        <h2 className="text-lg font-semibold mb-4">Confirm Checkout</h2>
        <p className="mb-4">Your total is <strong>₹{totalAmount.toFixed(2)}</strong></p>
        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose} 
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
