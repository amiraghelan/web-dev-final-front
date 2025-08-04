import ProductContainer from "@components/ProductsContainer";
import "@styles/pages/ProductsPage.scss";

const ProductsPage = () => {
   return (
      <div className="products">
         <main className="products-main">
            <ProductContainer />
         </main>
      </div>
   );
};

export default ProductsPage;
