import { useContext, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "@styles/components/AddToCartModal.scss";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import config from "@data/configs.json";
import type { CartItem } from "@model/cart-item.model";
import { toast } from "react-toastify";

interface AddToCartModalProps {
   productName: string;
   productId: string;
   initialValue: number;
   maximumCount: number;
   onClose: () => void;
}

const AddToCartModal = ({
   productName,
   productId,
   initialValue,
   onClose,
   maximumCount
}: AddToCartModalProps) => {
   const authContext = useContext(AuthContext);
   const [quantity, setQuantity] = useState(initialValue);

   if (!authContext)
      throw new Error("AuthContext must be used within AuthProvider");

   const { updateCart, token } = authContext;

   const handleIncrement = () => {
      setQuantity((prev) => Math.min(prev + 1, maximumCount));
   };

   const handleDecrement = () => {
      setQuantity((prev) => Math.max(prev - 1, 1));
   };

   const handleAdd = async () => {
      try {
         const response = await axios.post(
            `${config.apiBaseUrl}/cart`,
            {
               productId,
               quantity,
            },
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );
         updateCart(response.data.cart as CartItem[]);
         toast.success("added to cart successfully");
         onClose();
      } catch (error: any) {
         toast.error(error.response?.data?.error || "Failed to add product");
      }
   };

   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   return (
      <div
         className="modal-overlay"
         onClick={handleOverlayClick}>
         <div className="add-to-cart-modal-content">
            <button
               className="modal-close"
               onClick={onClose}>
               &times;
            </button>
            <h2 className="modal-title">Add {productName} to Cart</h2>
            <div className="modal-input-group">
               <button
                  className="modal-button"
                  onClick={handleDecrement}>
                  <FiMinus className="modal-icon" />
               </button>
               <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                     setQuantity(
                        Math.max(1, Math.min(99, parseInt(e.target.value) || 1))
                     )
                  }
                  className="modal-input"
               />
               <button
                  className="modal-button"
                  onClick={handleIncrement}>
                  <FiPlus className="modal-icon" />
               </button>
            </div>
            <button
               className="modal-add-button"
               onClick={handleAdd}>
               Add
            </button>
         </div>
      </div>
   );
};

export default AddToCartModal;
