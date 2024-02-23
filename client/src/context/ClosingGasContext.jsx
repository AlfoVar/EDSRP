import React, { createContext, useEffect, useState, useContext } from "react";
import {
  getClosingGas,
  createClosingGas,
  getClosingGasById,
} from "../api/closingGas";

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

  const fetchClosingGas = async () => {
    try {
      const response = await getClosingGas();
      setClosingGasData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClosingGasDataById = async (gasId) => {
    try {
      const response = await getClosingGasById(gasId);
      setClosingGasData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addClosingGasData = async (closingGasData) => {
    console.log(closingGasData);
    try {
      const response = await createClosingGas(closingGasData);
      setClosingGasData((prevClosingGasData) => [
        ...prevClosingGasData,
        response.data,
      ]);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClosingGas();
  }, []);
  // Provide the state and functions/methods to the children components
  return (
    <ClosingGasContext.Provider
      value={{
        closingGasData,
        setClosingGasData,
        addClosingGasData,
        getClosingGasDataById,
      }}
    >
      {children}
    </ClosingGasContext.Provider>
  );
};
