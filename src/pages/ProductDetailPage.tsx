import { useState } from "react";
import { useParams } from "react-router-dom";
import "@styles/pages/ProductDetailPage.scss";

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Minimal Watch",
    price: 99.99,
    description: "A sleek, minimalist watch for everyday wear.",
    stock: 10,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Sneakers",
    price: 59.99,
    description: "Comfortable and stylish sneakers for all occasions.",
    stock: 15,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    title: "Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with noise cancellation.",
    stock: 8,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657",
    title: "Sunglasses",
    price: 79.99,
    description: "Classic sunglasses with UV protection.",
    stock: 12,
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id || "1")) || products[0];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + delta)));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.title}(s) to cart`);
  };

  return (
    <div className="product-detail">
      <main className="product-detail-main">
        <div className="product-detail-content">
          <img src={product.image} alt={product.title} className="product-detail-image" />
          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-stock">In Stock: {product.stock}</p>
            <div className="product-detail-quantity">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="quantity-input"
              />
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;