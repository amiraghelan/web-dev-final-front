import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { NavLink, Routes, Route } from "react-router-dom";
import AdminPanelProducts from "@components/AdminPanelProducts";
import "@styles/components/AdminPanel.scss";

const AdminPanel = () => {
   const authContext = useContext(AuthContext);

   if (!authContext)
      throw new Error("AuthContext must be used within AuthProvider");

   const { user } = authContext;

   if (user.role !== "admin") {
      return <div className="admin-panel">Access denied. Admins only.</div>;
   }

   return (
      <div className="admin-panel">
         <div className="admin-container">
            <div className="admin-header">
               <h1 className="admin-title">Admin Panel</h1>
            </div>
            <div className="tabs">
               <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                     `tab ${isActive ? "active" : ""}`
                  }>
                  Products
               </NavLink>
            </div>
            <Routes>
               <Route
                  path=""
                  element={<></>}
               />
               <Route
                  path="products"
                  element={
                     <div className="tab-content">
                        <AdminPanelProducts />
                     </div>
                  }
               />
            </Routes>
         </div>
      </div>
   );
};

export default AdminPanel;
