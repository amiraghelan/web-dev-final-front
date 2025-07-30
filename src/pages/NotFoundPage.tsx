import "@styles/pages/NotFoundPage.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
       <main className="not-found-main">
        <div className="not-found-content">
          <h1 className="not-found-title">
            <span>404</span> - Page Not Found
          </h1>
          <p className="not-found-memo">Oops! The page you’re looking for doesn’t exist.</p>
          <Link to="/" className="not-found-button">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;