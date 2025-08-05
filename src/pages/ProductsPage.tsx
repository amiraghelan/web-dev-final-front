import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import config from "@data/configs.json";
import ProductsContainer from "@components/ProductsContainer";
import type { Product } from "@model/product.model";
import "@styles/pages/ProductsPage.scss";

const ProductsPage = () => {
  const authContext = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const {isAuthenticated, token } = authContext;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${config.apiBaseUrl}/product`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mappedProducts: Product[] = response.data.map((item: any) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          name: item.name,
          description: item.description,
          stock: item.stock,
          price: item.price,
          isOnSale: item.isOnSale,
          onSalePrice: item.onSalePrice,
        }));
        setProducts(mappedProducts);
      } catch (error: any) {
        console.error("Fetch products error:", error);
        toast.error(error.response?.data?.error || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div className="products">
      <main className="products-main">
        {isLoading ? (
          <div className="loading-spinner">
            <span>Loading...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No products available.</p>
          </div>
        ) : (
          <ProductsContainer products={products} isAuthenticated={isAuthenticated} />
        )}
      </main>
    </div>
  );
};

export default ProductsPage;