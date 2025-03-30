import { useEffect, useState, createContext, useContext } from "react";
import { logToApp } from "../api/authApiService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parsedUser.loginTime;

      if (timeDifference < 1000 * 60 * 60 * 24) {
        setIsLoggedIn(true);
        setUserRole(parsedUser.role);
        setUserId(parsedUser.userId);
      } else {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log(email, password);
      const response = await logToApp(email, password);
      setUserRole(response.data.role);
      setUserId(response.data.userId);
      setIsLoggedIn(true);

      const userData = {
        userId: response.data.userId,
        role: response.data.role,
        loginTime: new Date().getTime(),
      };
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserId(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userId, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
