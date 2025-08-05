import { useContext, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import AddToCartModal from "@components/AddToCartModal";
import "@styles/pages/CartPage.scss";

const CartPage = () => {
   const authContext = useContext(AuthContext);
   const [editItem, setEditItem] = useState<{
      productId: string;
      productName: string;
      quantity: number;
      stock: number;
   } | null>(null);

   if (!authContext)
      throw new Error("AuthContext must be used within AuthProvider");

   const { cart, deleteFromCart } = authContext;

   const calculateItemTotal = (item: {
      product: { price: number; isOnSale: boolean; onSalePrice: number };
      quantity: number;
   }) =>
      item.quantity *
      (item.product.isOnSale ? item.product.onSalePrice : item.product.price);

   const calculateCartTotal = () =>
      cart?.reduce((total, item) => total + calculateItemTotal(item), 0) || 0;

   const handleFinalizeOrder = () => {
      alert("Place finalized!");
   };

   const handleEdit = (item: {
      product: { id: string; name: string; stock: number };
      quantity: number;
   }) => {
      setEditItem({
         productId: item.product.id,
         productName: item.product.name,
         quantity: item.quantity,
         stock: item.product.stock,
      });
   };

   const handleDelete = async (productId: string, productName: string) => {
      try {
         await deleteFromCart(productId);
         toast.success(`Removed ${productName} from cart`);
      } catch (error: any) {
         console.log(error);
         toast.error(error.message || "Failed to remove from cart");
      }
   };

   return (
      <div className="cart-page">
         <main className="cart-main">
            <h1 className="cart-title">Your Cart</h1>
            {cart && cart.length > 0 ? (
               <div className="cart-content">
                  <div className="cart-headers">
                     <span className="cart-header">Product Name</span>
                     <span className="cart-header">Quantity</span>
                     <span className="cart-header">Price</span>
                     <span className="cart-header">Total</span>
                     <span className="cart-header">Actions</span>
                  </div>
                  <div className="cart-items">
                     {cart.map((item, index) => (
                        <div
                           key={index}
                           className="cart-item">
                           <span
                              className="cart-item-name"
                              data-label="Product Name">
                              {item.product.name}
                           </span>
                           <span
                              className="cart-item-quantity"
                              data-label="Quantity">
                              {item.quantity}
                           </span>
                           <span
                              className="cart-item-price"
                              data-label="Price">
                              {item.product.isOnSale ? (
                                 <>
                                    <span className="original-price">{`$${item.product.price.toFixed(
                                       2
                                    )}`}</span>
                                    <span className="sale-price">{`$${item.product.onSalePrice.toFixed(
                                       2
                                    )}`}</span>
                                 </>
                              ) : (
                                 <span>{`$${item.product.price.toFixed(
                                    2
                                 )}`}</span>
                              )}
                           </span>
                           <span
                              className="cart-item-total"
                              data-label="Total">{`$${calculateItemTotal(
                              item
                           ).toFixed(2)}`}</span>
                           <div
                              className="cart-item-actions"
                              data-label="Actions">
                              <button
                                 className="cart-item-button edit-button"
                                 onClick={() => handleEdit(item)}>
                                 Edit
                              </button>
                              <button
                                 className="cart-item-button delete-button"
                                 onClick={() =>
                                    handleDelete(
                                       item.product.id,
                                       item.product.name
                                    )
                                 }>
                                 Delete
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="cart-footer">
                     <span className="cart-total">
                        Total: ${calculateCartTotal().toFixed(2)}
                     </span>
                     <button
                        className="finalize-button"
                        onClick={handleFinalizeOrder}>
                        Finalize Order
                     </button>
                  </div>
               </div>
            ) : (
               <div className="cart-empty">
                  <FiShoppingCart className="cart-empty-icon" />
                  <p className="cart-empty-text">Cart is empty.</p>
               </div>
            )}
         </main>
         {editItem && (
            <AddToCartModal
               maximumCount={editItem.stock}
               productName={editItem.productName}
               productId={editItem.productId}
               initialValue={editItem.quantity}
               onClose={() => setEditItem(null)}
            />
         )}
      </div>
   );
};

export default CartPage;
