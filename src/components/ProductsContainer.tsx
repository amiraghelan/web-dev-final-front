import ProductCard from "@components/ProductCard";
import "@styles/components/ProductsContainer.scss";

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
const ProductContainer = () => {
   return (
      <div className="product-container">
         {products.map((product) => (
            <ProductCard
               key={product.id}
               id={product.id}
               image={product.image}
               title={product.title}
               price={product.price}
            />
         ))}
      </div>
   );
};

export default ProductContainer;
