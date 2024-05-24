import { createContext, useEffect, useState, useCallback } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = useCallback(async (currentToken) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        setToken(currentToken);
      } else {
        window.localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Failed to verify token:", error);
      window.localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const potentialToken = window.localStorage.getItem("authToken");
    if (potentialToken) {
      verifyToken(potentialToken);
    } else {
      setIsLoading(false);
    }
  }, [verifyToken]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
  };

  const withToken = async (endpoint, method = "GET", payload) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        options
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch with token:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ token, setToken, logout, isLoading, withToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
