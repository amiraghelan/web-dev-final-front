import type { CartItem } from "@model/cart-item.model";
import type { User } from "@model/user.model";
import axios from "axios";
import { createContext, useState, useEffect, type ReactNode } from "react";
import config from "@data/configs.json";

interface AuthContextType {
   isAuthenticated: boolean;
   user: User;
   token: string | null;
   cart: CartItem[] | null;
   loading: boolean;
   login: (token: string, user: User, cart: CartItem[]) => void;
   signup: (token: string, user: User, cart: CartItem[]) => void;
   logout: () => void;
   updateUser: (user: User) => void;
   updateCart: (cart: CartItem[]) => void;
   deleteFromCart: (productId: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
   undefined
);

interface AuthProviderProps {
   children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState<User>({
      id: null,
      username: null,
      firstName: null,
      lastName: null,
      role: null,
   });
   const [token, setToken] = useState<string | null>(null);
   const [cart, setCart] = useState<CartItem[] | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const storedToken = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");
      const storedCart = sessionStorage.getItem("cart");

      if (storedToken && storedUser && storedCart) {
         try {
            const parsedUser = JSON.parse(storedUser);
            const parsedCart = JSON.parse(storedCart);
            setToken(storedToken);
            setUser(parsedUser);
            setCart(parsedCart);
            setIsAuthenticated(true);
         } catch (error) {
            console.error("Failed to parse user from sessionStorage", error);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("cart");
         }
      } else {
         console.log("No token or user found in sessionStorage");
      }
      setLoading(false);
   }, []);

   const login = (token: string, user: User, cart: CartItem[]) => {
      setToken(token);
      setUser(user);
      setCart(cart);
      setIsAuthenticated(true);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("cart", JSON.stringify(cart));
   };

   const signup = (token: string, user: User, cart: CartItem[]) => {
      setToken(token);
      setUser(user);
      setCart(cart);
      setIsAuthenticated(true);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("cart", JSON.stringify(cart));
   };

   const logout = () => {
      setToken(null);
      setUser({
         id: null,
         username: null,
         firstName: null,
         lastName: null,
         role: null,
      });
      setCart(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("cart");
   };

   const updateUser = (updatedUser: User) => {
      setUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
   };

   const updateCart = (updatedCart: CartItem[]) => {
      setCart(updatedCart);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
   };

   const deleteFromCart = async (productId: string) => {
      if (!isAuthenticated) {
         throw new Error("Please log in to modify cart");
      }
      try {
         const response = await axios.delete(`${config.apiBaseUrl}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { productId },
         });
         updateCart(response.data.cart || []);
      } catch (error: any) {
         console.log(error)
         throw new Error(
            error.response?.data?.error || "Failed to remove from cart"
         );
      }
   };

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            user,
            token,
            loading,
            login,
            cart,
            updateCart,
            signup,
            logout,
            updateUser,
            deleteFromCart,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
