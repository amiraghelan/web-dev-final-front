import "@styles/components/AdminPanel.scss"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import config from "@data/configs.json";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  stock: number;
  image: string;
}

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { token } = authContext;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div className="admin-panel">
      <main className="admin-panel-main">
        <div className="admin-panel-content">
          <h1 className="admin-panel-title">Admin Panel</h1>
          <section className="admin-section">
            <h2>Manage Products</h2>
            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="product-list">
                {products.map((product) => (
                  <div key={product.id} className="product-item">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <div className="product-details">
                      <h3>{product.title}</h3>
                      <p>Price: ${product.price.toFixed(2)}</p>
                      <p>{product.description}</p>
                      <p>Stock: {product.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;