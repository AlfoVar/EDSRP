import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getClosingData,
  getClosingDataByDate,
  createClosing,
} from "../api/closing";
import { useAuth } from './AuthContext';

export const ClosingContext = createContext();

export const useClosing = () => {
  const context = useContext(ClosingContext);
  if (!context) {
    throw new Error("useClosing must be used within a ClosingProvider");
  }
  return context;
};

export const ClosingContextProvider = ({ children }) => {
  const [closings, setClosings] = useState([]);

  const{ isAuthenticated } = useAuth();

  const fetchClosing = async () => {
    try {
      const response = await getClosingData();
      setClosings(response.data);
    } catch (error) {
      throw error
    }
  };

  const getClosingsByDate = async (dateClosing) => {
    console.log(dateClosing);
    try {
      const closingsByDay = await getClosingDataByDate(dateClosing);
      setClosings(closingsByDay.data);
    } catch (error) {
      throw error
    }
  };

  const addClosing = async (closingData) => {
    console.log("context", closingData)
    try {
      const response = await createClosing(closingData);
      setClosings((prevClosingData) => [...prevClosingData, response.data]);
      fetchClosing();
      return response.data;
    } catch (error) {
     throw error
    }
  };

  useEffect(() => {
    if(isAuthenticated) fetchClosing();
  }, [isAuthenticated]);

  return (
    <ClosingContext.Provider
      value={{ closings, getClosingsByDate, addClosing }}
    >
      {children}
    </ClosingContext.Provider>
  );
};
