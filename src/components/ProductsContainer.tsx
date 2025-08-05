import ProductCard from "@components/ProductCard";
import type { Product } from "@model/product.model";

interface ProductsContainerProps {
  products: Product[];
  isAuthenticated: boolean;
}

const ProductsContainer = ({ products, isAuthenticated }: ProductsContainerProps) => {
  return (
    <div className="container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isAuthenticated={isAuthenticated} />
      ))}
    </div>
  );
};

export default ProductsContainer;