import React, { createContext, useContext, useEffect, useState } from "react";
import { getGrocers } from "../api/grocer";

// Create the context
const GrocerContext = createContext();

// Create a provider component
export const GrocerProvider = ({ children }) => {
  // State and functions for grocer.js
  const [grocerState, setGrocerState] = useState([]);

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
    fetchGrocers();
  }, []);

  return (
    <GrocerContext.Provider value={grocerState}>
      {children}
    </GrocerContext.Provider>
  );
};

// Custom hook to access the grocer context
export const useGrocerContext = () => useContext(GrocerContext);
