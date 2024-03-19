import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginUser, logoutUser, verifyTokenRequest } from "../api/auth";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const signup = async (user) => {
    try {
      const resRegister = await registerRequest(user);
      console.log(resRegister.data);
      setIsAuthenticated(true);
      setUser(resRegister.data);
    } catch (error) {
      console.log(error.response);
      const errorData = error.response.data;
      setErrors(errorData.message);
    }
  };

  const signin = async (user) => {
    try {
      const resLogin = await loginUser(user);
      console.log(resLogin.data);
      setUser(resLogin.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      const errorData = error.response.data;
      setErrors(errorData.message);
    }
  };

  const logout = async () => {
    try {
      const resLogout = await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      const errorData = error.response.data;
      setErrors(errorData.message);
    }
  };

  useEffect(() => {
    if (errors.length) {
      const loginTimer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(loginTimer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookieRegister = Cookie.get();
     // console.log(cookieRegister);

      if (!cookieRegister.token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return setUser(null);
      }

      try {
        const resToken = await verifyTokenRequest(cookieRegister.token);
        if (!resToken.data) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setUser(resToken.data);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        isLoading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
