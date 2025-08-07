import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import "@styles/components/Navbar.scss";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [activeNav, setActiveNav] = useState("Home");
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const authContext = useContext(AuthContext);

   if (!authContext)
      throw new Error("AuthContext must be used within AuthProvider");

   const { isAuthenticated, user, logout, cart } = authContext;

   const cartCount = cart?.length

   useEffect(() => {
      if (location.pathname.startsWith("/products")) {
         setActiveNav("Products");
      } else if (location.pathname === "/") {
         setActiveNav("Home");
      } else if (location.pathname === "/auth") {
         setActiveNav("Auth");
      } else if (location.pathname === "/about-us") {
         setActiveNav("About Us");
      } else if (location.pathname === "/admin") {
         setActiveNav("Admin Panel");
      } else if (location.pathname === "/profile") {
         setActiveNav("Profile");
      } else {
         setActiveNav("");
      }
   }, [location]);

   const handleNavClick = (nav: string) => {
      setActiveNav(nav);
      if (nav === "Products") {
         navigate("/products");
      } else if (nav === "Home") {
         navigate("/");
      } else if (nav === "Auth") {
         navigate("/auth");
      } else if (nav === "About Us") {
         navigate("/about-us");
      } else if (nav === "Admin Panel") {
         navigate("/admin");
      } else if (nav === "Profile") {
         navigate("/profile");
      }
      setIsOpen(false);
      setIsProfileOpen(false);
   };

   const handleLogout = () => {
      logout();
      navigate("/auth");
      setIsOpen(false);
      setIsProfileOpen(false);
   };

   const navItems = [
      "Home",
      ...(!isAuthenticated ? ["Auth"] : []),
      "Products",
      "About Us",
      ...(user?.role === "admin" ? ["Admin Panel"] : []),
   ];

   return (
      <header className="navbar">
         <div className="navbar-container">
            <h1 className="navbar-logo">Awsome Shop</h1>
            <button
               className="mobile-toggle"
               onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? "✕" : "☰"}
            </button>
            <nav className="desktop-nav">
               <ul className="nav-list">
                  {navItems.map((nav) => (
                     <li key={nav}>
                        <a
                           href="#"
                           className={`nav-link ${
                              activeNav === nav ? "active" : ""
                           }`}
                           onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(nav);
                           }}>
                           {nav}
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>
            {isAuthenticated && (
               <div className="navbar-icons">
                  <div className="profile-menu">
                     <button
                        className="nav-icon profile-icon"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        title="Profile">
                        <img src="/profile.png" alt="Profile" />
                     </button>
                     {isProfileOpen && (
                        <div className="profile-dropdown">
                           <button
                              className="dropdown-item"
                              onClick={() => handleNavClick("Profile")}>
                              Profile
                           </button>
                           <button
                              className="dropdown-item"
                              onClick={handleLogout}>
                              Logout
                           </button>
                        </div>
                     )}
                  </div>
                  <button
                     className="nav-icon cart-icon"
                     onClick={() => navigate("/cart")}
                     title="Cart">
                     {cartCount ? (<div className="badge">{cartCount}</div>) : <></>}
                     <img src="/cart.png" alt="Cart"/>
                  </button>
               </div>
            )}
            <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>
               <ul className="mobile-nav-list">
                  {navItems.map((nav) => (
                     <li key={nav}>
                        <a
                           href="#"
                           className={`nav-link ${
                              activeNav === nav ? "active" : ""
                           }`}
                           onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(nav);
                           }}>
                           {nav}
                        </a>
                     </li>
                  ))}
                  {isAuthenticated && (
                     <>
                        <li>
                           <a
                              href="#"
                              className={`nav-link ${
                                 activeNav === "Profile" ? "active" : ""
                              }`}
                              onClick={(e) => {
                                 e.preventDefault();
                                 handleNavClick("Profile");
                              }}>
                              Profile
                           </a>
                        </li>
                        <li>
                           <button
                              className="nav-link logout-button"
                              onClick={handleLogout}>
                              Logout
                           </button>
                        </li>
                     </>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   );
};

export default Navbar;
