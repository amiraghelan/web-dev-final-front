import { useState, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import config from "@data/configs.json";
import "@styles/components/AuthCard.scss";
import { useNavigate } from "react-router-dom";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { login, signup } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const username = (document.getElementById(isLogin ? "login-username" : "signup-username") as HTMLInputElement).value;
    const password = (document.getElementById(isLogin ? "login-password" : "signup-password") as HTMLInputElement).value;
    const confirmPassword = !isLogin ? (document.getElementById("signup-confirm-password") as HTMLInputElement).value : "";
    const firstName = !isLogin ? (document.getElementById("signup-firstname") as HTMLInputElement).value : "";
    const lastName = !isLogin ? (document.getElementById("signup-lastname") as HTMLInputElement).value : "";

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const endpoint = isLogin ? "/user/login" : "/user/register";
    const body = isLogin
      ? { username, password }
      : { username, password, confirmPassword, firstName: firstName || undefined, lastName: lastName || undefined, role: "user" };

    try {
      const response = await axios.post(`${config.apiBaseUrl}${endpoint}`, body);
      const { token, user } = response.data;
      toast.success(isLogin ? `Welcome ${user.username}` : "Signup Successful");
      isLogin ? login(token, user) : signup(token, user);
      navigate("/products");
    } catch (error: any) {
      toast.error(error.response?.data?.error || (isLogin ? "Login Failed" : "Signup Failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = (login: boolean) => {
    setIsLogin(login);
  };

  return (
    <div className="auth-card">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${isLogin ? "active" : ""}`}
          onClick={() => toggleForm(true)}
          disabled={isLoading}
        >
          Login
        </button>
        <button
          className={`auth-tab ${!isLogin ? "active" : ""}`}
          onClick={() => toggleForm(false)}
          disabled={isLoading}
        >
          Signup
        </button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">{isLogin ? "Login" : "Signup"}</h2>
        <div className="auth-field">
          <label htmlFor={isLogin ? "login-username" : "signup-username"}>
            Username <span className="required">*</span>
          </label>
          <input
            type="text"
            id={isLogin ? "login-username" : "signup-username"}
            placeholder="Enter your username"
            className="auth-input"
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor={isLogin ? "login-password" : "signup-password"}>
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id={isLogin ? "login-password" : "signup-password"}
            placeholder="Enter your password"
            className="auth-input"
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="auth-field">
              <label htmlFor="signup-confirm-password">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                placeholder="Confirm your password"
                className="auth-input"
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signup-firstname">First Name</label>
              <input
                type="text"
                id="signup-firstname"
                placeholder="Enter your first name"
                className="auth-input"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signup-lastname">Last Name</label>
              <input
                type="text"
                id="signup-lastname"
                placeholder="Enter your last name"
                className="auth-input"
              />
            </div>
          </>
        )}
        <button type="submit" className="auth-submit" disabled={isLoading}>
          {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default AuthCard;