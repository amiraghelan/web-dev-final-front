import "@styles/components/AdminPanel.scss"
const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <main className="admin-panel-main">
        <div className="admin-panel-content">
          <h1 className="admin-panel-title">Admin Panel</h1>
          <section className="admin-section">
            <h2>Manage Products</h2>
            <p>Product management features coming soon...</p>
            {/* Placeholder for product list */}
            <div className="product-list">
              <p>No products loaded yet. Add API integration to display products.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;