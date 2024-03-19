import React, { createContext, useEffect, useState, useContext } from "react";
import {
  getClosingGas,
  createClosingGas,
  getClosingGasById,
  deleteClosingGas
} from "../api/closingGas";
import { useAuth } from './AuthContext';

// Create the ClosingGasContext
export const ClosingGasContext = createContext();

export const useClosingGasConstext = () => {
  const context = useContext(ClosingGasContext);
  if (!context) {
    throw new Error("useClosingGas must be used within a ClosingGasProvider");
  }
  return context;
};

// Create the ClosingGasProvider component
export const ClosingGasProvider = ({ children }) => {
  // Define the state for the ClosingGas API
  const [closingGasData, setClosingGasData] = useState([]);
  const{ isAuthenticated } = useAuth();

  const fetchClosingGas = async () => {
    try {
      const response = await getClosingGas();
      setClosingGasData(response.data);
    } catch (error) {
      throw error
    }
  };

  const getClosingGasDataById = async (gasId) => {
    try {
      const response = await getClosingGasById(gasId);
      setClosingGasData(response.data);
    } catch (error) {
      throw error
    }
  };

  const addClosingGasData = async (closingGasData) => {
    try {
      const response = await createClosingGas(closingGasData);
      setClosingGasData((prevClosingGasData) => [
        ...prevClosingGasData,
        response.data,
      ]);
      fetchClosingGas();
      return response.data;
    } catch (error) {
      throw error
    }
  };

  const deleteGas = async (id) => {
      try {
        const res = await deleteClosingGas(id);
        return res;
      } catch (error) {
        throw error
      }
    };

  useEffect(() => {
    if(isAuthenticated) fetchClosingGas();
  }, [isAuthenticated]);
  return (
    <ClosingGasContext.Provider
      value={{
        closingGasData,
        setClosingGasData,
        addClosingGasData,
        getClosingGasDataById,
        deleteGas,
      }}
    >
      {children}
    </ClosingGasContext.Provider>
  );
};
