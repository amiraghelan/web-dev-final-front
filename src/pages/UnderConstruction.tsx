import { useNavigate } from "react-router-dom";
import "@styles/pages/UnderConstruction.scss";

const UnderConstruction = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="under-construction-page">
      <main className="under-construction-main">
        <div className="under-construction-content">
          <h1 className="under-construction-title">Under Construction</h1>
          <p className="under-construction-message">
            This page is still being built. Check back soon for exciting updates!
          </p>
          <button className="under-construction-back-button" onClick={handleBack}>
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default UnderConstruction;