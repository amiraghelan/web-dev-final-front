import { useState } from "react"; // Added useEffect for debugging
import { toast } from "react-toastify";
import type { Product } from "@model/product.model";
import "@styles/components/ProducCard.scss";

interface ProductCardProps {
   product: Product;
   isAuthenticated: boolean;
}

const ProductCard = ({ product, isAuthenticated }: ProductCardProps) => {
   const defaultImage = "/default-image.svg";
   const [imageSrc, setImageSrc] = useState(product.imageUrl);

   const addToCart = () => {
      if (!isAuthenticated) {
         toast.error("Please log in to add to cart");
         return;
      }
      if (product.stock === 0) {
         toast.error("This product is out of stock");
         return;
      }
      // Placeholder for cart functionality
      toast.success(`Added ${product.name} to cart`);
   };

   const handleImageError = () => {
      setImageSrc(defaultImage); // Set default image on error
   };

   return (
      <div className={`card ${product.stock === 0 ? "out-of-stock" : ""}`}>
         <img
            src={imageSrc}
            alt={product.name}
            className="card-image"
            onError={handleImageError}
         />
         <div className="card-content">
            <h2 className="card-title">{product.name}</h2>
            <div className="card-price">
               {product.isOnSale ? (
                  <>
                     <span className="original-price">{`$${product.price.toFixed(
                        2
                     )}`}</span>
                     <span className="sale-price">{`$${product.onSalePrice.toFixed(
                        2
                     )}`}</span>
                  </>
               ) : (
                  <span>{`$${product.price.toFixed(2)}`}</span>
               )}
            </div>
            {product.stock === 0 && (
               <p className="out-of-stock-text">Out of Stock</p>
            )}
            <div className="card-actions">
               <button
                  className="add-to-cart-button"
                  onClick={addToCart}
                  disabled={!isAuthenticated || product.stock === 0}
                  data-tooltip={
                     !isAuthenticated && product.stock > 0 ? "login" : ""
                  }>
                  Add to Cart
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
