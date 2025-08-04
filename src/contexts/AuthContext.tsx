import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
   id: number | null;
   username: string | null;
   firstName: string | null;
   lastName: string | null;
   role: "user" | "admin" | null;
}

interface AuthContextType {
   isAuthenticated: boolean;
   user: User;
   token: string | null;
   login: (token: string, user: User) => void;
   signup: (token: string, user: User) => void;
   logout: () => void;
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

   useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    if (storedToken && storedUser) {
      console.log("readed from sotrage")
      console.log(storedToken)
      console.log(storedUser)
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user from sessionStorage", error);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      }
    }
  }, []);

   const login = (token: string, user: User) => {
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
   };

   const signup = (token: string, user: User) => {
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
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
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
   };

   return (
      <AuthContext.Provider
         value={{ isAuthenticated, user, token, login, signup, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
