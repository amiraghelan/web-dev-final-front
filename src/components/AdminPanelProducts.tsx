import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import config from "@data/configs.json";
import "@styles/components/AdminPanelProducts.scss";

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  isOnSale: boolean;
  onSalePrice: number;
}

const AdminPanelProducts = () => {
  const authContext = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    imageUrl: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    isOnSale: false,
    onSalePrice: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { token } = authContext;

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const openAddProductModal = () => {
    setNewProduct({ imageUrl: "", name: "", description: "", stock: 0, price: 0, isOnSale: false, onSalePrice: 0 });
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
    setNewProduct({ imageUrl: "", name: "", description: "", stock: 0, price: 0, isOnSale: false, onSalePrice: 0 });
  };

  const openEditProductModal = (product: Product) => {
    setEditProduct(product);
    setIsEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    setIsEditProductModalOpen(false);
    setEditProduct(null);
  };

  const openDeleteModal = (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newProduct.imageUrl ||
      !newProduct.name ||
      !newProduct.description ||
      newProduct.stock < 0 ||
      newProduct.price <= 0 ||
      (newProduct.isOnSale && newProduct.onSalePrice <= 0)
    ) {
      toast.error("All fields are required, and stock/price must be valid. On-sale price required if on sale.");
      return;
    }
    setIsLoading(true);
    try {
      const payload: Omit<Product, "id"> = {
        imageUrl: newProduct.imageUrl,
        name: newProduct.name,
        description: newProduct.description,
        stock: newProduct.stock,
        price: newProduct.price,
        isOnSale: newProduct.isOnSale,
        onSalePrice: newProduct.onSalePrice,
      };
      await axios.post(`${config.apiBaseUrl}/product`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product added successfully");
      await fetchProducts();
      closeAddProductModal();
    } catch (error: any) {
      console.error("Add product error:", error);
      toast.error(error.response?.data?.error || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    if (
      !editProduct.imageUrl ||
      !editProduct.name ||
      !editProduct.description ||
      editProduct.stock < 0 ||
      editProduct.price <= 0 ||
      (editProduct.isOnSale && editProduct.onSalePrice <= 0)
    ) {
      toast.error("All fields are required, and stock/price must be valid. On-sale price required if on sale.");
      return;
    }
    setIsLoading(true);
    try {
      const payload: Product = {
        id: editProduct.id, // Ensure id is included
        imageUrl: editProduct.imageUrl,
        name: editProduct.name,
        description: editProduct.description,
        stock: editProduct.stock,
        price: editProduct.price,
        isOnSale: editProduct.isOnSale,
        onSalePrice: editProduct.isOnSale ? editProduct.onSalePrice : 0, // Ensure onSalePrice is 0 if not on sale
      };
      console.log("Edit product payload:", payload); // Debug payload
      await axios.put(`${config.apiBaseUrl}/product`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product updated successfully");
      await fetchProducts();
      closeEditProductModal();
    } catch (error: any) {
      console.error("Edit product error:", error);
      toast.error(error.response?.data?.error || "Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId) return;
    setIsLoading(true);
    try {
      const payload = { id: selectedProductId };
      console.log("Delete product payload:", payload); // Debug payload
      await axios.delete(`${config.apiBaseUrl}/product`, {
        headers: { Authorization: `Bearer ${token}` },
        data: payload,
      });
      toast.success("Product deleted successfully");
      await fetchProducts();
      closeDeleteModal();
    } catch (error: any) {
      console.error("Delete product error:", error);
      toast.error(error.response?.data?.error || "Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-products">
      <div className="products-header">
        <h2 className="products-title">Products</h2>
        <button className="add-product-button" onClick={openAddProductModal} disabled={isLoading}>
          Add New Product
        </button>
      </div>
      {isLoading ? (
        <div className="loading-spinner">
          <span>Loading...</span>
        </div>
      ) : products.length > 0 ? (
        <div className="products-table">
          <div className="product-header">
            <span className="header-cell">Name</span>
            <span className="header-cell">Actions</span>
          </div>
          {products.map((product) => (
            <div key={product.id} className="product-row">
              <span className="product-cell">{product.name}</span>
              <span className="product-cell actions">
                <button
                  className="edit-product-button"
                  onClick={() => openEditProductModal(product)}
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  className="delete-product-button"
                  onClick={() => openDeleteModal(product.id)}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>You don’t have any products yet. Try adding one to get started!</p>
        </div>
      )}

      {isAddProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="modal-close" onClick={closeAddProductModal}>✕</button>
            </div>
            <form onSubmit={handleAddProductSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  placeholder="Enter stock"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  placeholder="Enter price"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="isOnSale">On Sale</label>
                <input
                  type="checkbox"
                  id="isOnSale"
                  checked={newProduct.isOnSale}
                  onChange={(e) => setNewProduct({ ...newProduct, isOnSale: e.target.checked })}
                />
              </div>
              {newProduct.isOnSale && (
                <div className="form-group">
                  <label htmlFor="onSalePrice">On Sale Price</label>
                  <input
                    type="number"
                    id="onSalePrice"
                    value={newProduct.onSalePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, onSalePrice: Number(e.target.value) })}
                    placeholder="Enter on-sale price"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeAddProductModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditProductModalOpen && editProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button className="modal-close" onClick={closeEditProductModal}>✕</button>
            </div>
            <form onSubmit={handleEditProductSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="editImageUrl">Image URL</label>
                <input
                  type="text"
                  id="editImageUrl"
                  value={editProduct.imageUrl}
                  onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editName">Name</label>
                <input
                  type="text"
                  id="editName"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editDescription">Description</label>
                <input
                  type="text"
                  id="editDescription"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editStock">Stock</label>
                <input
                  type="number"
                  id="editStock"
                  value={editProduct.stock}
                  onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                  placeholder="Enter stock"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editPrice">Price</label>
                <input
                  type="number"
                  id="editPrice"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  placeholder="Enter price"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editIsOnSale">On Sale</label>
                <input
                  type="checkbox"
                  id="editIsOnSale"
                  checked={editProduct.isOnSale}
                  onChange={(e) => setEditProduct({ ...editProduct, isOnSale: e.target.checked })}
                />
              </div>
              {editProduct.isOnSale && (
                <div className="form-group">
                  <label htmlFor="editOnSalePrice">On Sale Price</label>
                  <input
                    type="number"
                    id="editOnSalePrice"
                    value={editProduct.onSalePrice}
                    onChange={(e) => setEditProduct({ ...editProduct, onSalePrice: Number(e.target.value) })}
                    placeholder="Enter on-sale price"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeEditProductModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={closeDeleteModal}>✕</button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete this product?</p>
            </div>
            <div className="modal-actions">
              <button type="button" className="cancel-button" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                className="delete-product-button"
                onClick={handleDeleteProduct}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanelProducts;