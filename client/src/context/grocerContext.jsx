import React, { createContext, useContext, useEffect, useState } from "react";
import { getGrocers } from "../api/grocer";
import { useAuth } from './AuthContext';

// Create the context
const GrocerContext = createContext();

// Create a provider component
export const GrocerProvider = ({ children }) => {
  // State and functions for grocer.js
  const [grocerState, setGrocerState] = useState([]);
  const{ isAuthenticated } = useAuth();

  const fetchGrocers = async () => {
    try {
      const response = await getGrocers();
      setGrocerState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect and other logic for grocer.js
  useEffect(() => {
   if(isAuthenticated) fetchGrocers();
  }, [isAuthenticated]);

  return (
    <GrocerContext.Provider value={grocerState}>
      {children}
    </GrocerContext.Provider>
  );
};

// Custom hook to access the grocer context
export const useGrocerContext = () => useContext(GrocerContext);
