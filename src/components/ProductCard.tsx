import "@styles/components/ProducCard.scss";
import { Link } from "react-router-dom";

interface ProductCardProps {
   id: number;
   image: string;
   title: string;
   price: number;
}

const ProductCard = ({id, image, title, price }: ProductCardProps) => {
   return (
      <Link to={`/products/${id}`}>
         <div className="product-card">
            <img
               src={image}
               alt={title}
               className="product-image"
            />
            <h3 className="product-title">{title}</h3>
            <p className="product-price">${price.toFixed(2)}</p>
         </div>
      </Link>
   );
};

export default ProductCard;
