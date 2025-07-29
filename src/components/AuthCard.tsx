import { useState } from "react";
import "@styles/components/AuthCard.scss"

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (login: boolean) => {
    setIsLogin(login);
  };

  return (
    <div className="auth-card">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${isLogin ? "active" : ""}`}
          onClick={() => toggleForm(true)}
        >
          Login
        </button>
        <button
          className={`auth-tab ${!isLogin ? "active" : ""}`}
          onClick={() => toggleForm(false)}
        >
          Signup
        </button>
      </div>
      {isLogin ? (
        <div className="auth-form">
          <h2 className="auth-title">Login</h2>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              placeholder="Enter your email"
              className="auth-input"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              placeholder="Enter your password"
              className="auth-input"
            />
          </div>
          <button className="auth-submit">Login</button>
        </div>
      ) : (
        <div className="auth-form">
          <h2 className="auth-title">Signup</h2>
          <div className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              placeholder="Enter your email"
              className="auth-input"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              placeholder="Enter your password"
              className="auth-input"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              type="password"
              id="signup-confirm-password"
              placeholder="Confirm your password"
              className="auth-input"
            />
          </div>
          <button className="auth-submit">Signup</button>
        </div>
      )}
    </div>
  );
};

export default AuthCard;