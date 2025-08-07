import "@styles/components/HeroBanner.scss";
import { Link } from "react-router-dom";

const HeroBanner = () => {
   return (
      <section className="hero-banner">
         <div className="container">
            <div className="hero-content">
               <h1 className="hero-title">Welcome to Awsome Shop</h1>
               <p className="hero-memo">
                  Discover quality products with a touch of elegance.
               </p>
               <Link
                  to="/products"
                  className="hero-button">
                  Start Shopping
               </Link>
            </div>
         </div>
      </section>
   );
};

export default HeroBanner;
