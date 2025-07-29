import "@styles/components/HeroBanner.scss";

const HeroBanner = () => {
   return (
      <section className="hero-banner">
         <div className="container">
            <div className="hero-content">
               <h1 className="hero-title">Welcome to My Shop</h1>
               <p className="hero-memo">
                  Discover quality products with a touch of elegance.
               </p>
               <a
                  href="#"
                  className="hero-button">
                  Start Shopping
               </a>
            </div>
         </div>
      </section>
   );
};

export default HeroBanner;
