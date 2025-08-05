import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "@styles/components/AddToCartModal.scss";

interface AddToCartModalProps {
  productName: string;
  productId: string;
  initialValue: number;
  onClose: () => void;
}

const AddToCartModal = ({ productName, productId, initialValue, onClose }: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    alert(`Added ${quantity} of ${productName} to cart`);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Add {productName} to Cart</h2>
        <div className="modal-input-group">
          <button className="modal-button" onClick={handleDecrement}>
            <FiMinus className="modal-icon" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="modal-input"
          />
          <button className="modal-button" onClick={handleIncrement}>
            <FiPlus className="modal-icon" />
          </button>
        </div>
        <button className="modal-add-button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;