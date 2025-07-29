import "@styles/pages/NotFoundPage.scss";

const NotFound = () => {
  return (
    <div className="not-found">
       <main className="not-found-main">
        <div className="not-found-content">
          <h1 className="not-found-title">
            <span>404</span> - Page Not Found
          </h1>
          <p className="not-found-memo">Oops! The page you’re looking for doesn’t exist.</p>
          <a href="#" className="not-found-button">
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
};

export default NotFound;