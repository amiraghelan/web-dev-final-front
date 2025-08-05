import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import config from "@data/configs.json";
import type { Product } from "@model/product.model";
import AddToCartModal from "@components/AddToCartModal";
import "@styles/pages/ProductDetailPage.scss";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultImage = "/default-image.svg";

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { isAuthenticated, token } = authContext;

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${config.apiBaseUrl}/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        const mappedProduct: Product = {
          id: data.id,
          imageUrl: data.imageUrl,
          name: data.name,
          description: data.description,
          stock: data.stock,
          price: data.price,
          isOnSale: data.isOnSale,
          onSalePrice: data.onSalePrice,
        };
        setProduct(mappedProduct);
        setImageSrc(data.imageUrl);
      } catch (error: any) {
        console.error("Fetch product error:", error);
        toast.error(error.response?.data?.error || "Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleImageError = () => {
    setImageSrc(defaultImage);
  };

  const addToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to cart");
      return;
    }
    if (product?.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="product-detail">
        <main className="product-detail-main">
          <div className="loading-spinner">
            <span>Loading...</span>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <main className="product-detail-main">
          <p>Product not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <main className="product-detail-main">
        <div className="product-detail-card">
          <img
            src={imageSrc}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
          <div className="product-content">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price">
              {product.isOnSale ? (
                <>
                  <span className="original-price">{`$${product.price.toFixed(2)}`}</span>
                  <span className="sale-price">{`$${product.onSalePrice.toFixed(2)}`}</span>
                </>
              ) : (
                <span>{`$${product.price.toFixed(2)}`}</span>
              )}
            </div>
            <p className={`product-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
              {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
            </p>
            <p className="product-id">Product ID: {product.id}</p>
            <button
              className="add-to-cart-button"
              onClick={addToCart}
              disabled={!isAuthenticated || product.stock === 0}
              data-tooltip={!isAuthenticated && product.stock > 0 ? "login" : ""}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <AddToCartModal
          productName={product.name}
          productId={product.id}
          initialValue={1}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;