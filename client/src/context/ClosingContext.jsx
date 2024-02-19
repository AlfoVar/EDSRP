import React, { createContext, useContext, useEffect, useState } from "react";
import {getClosingData ,getClosingDataByDate} from "../api/closing";

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

  const fetchClosing = async () => {
    try {
      const response = await getClosingData();
      setClosings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClosingsByDate = async (dateClosing) => {
    console.log(dateClosing)
    try {
      const closingsByDay = await getClosingDataByDate(dateClosing);
      setClosings(closingsByDay.data);
    } catch (error) {
      const errorData = error.response.data;
      console.log(errorData.message);
      setErrors(errorData.message);
    }
  };

  useEffect(() => {
    fetchClosing();
  }, []);
  
  return (
    <ClosingContext.Provider value={{ closings, getClosingsByDate }}>
      {children}
    </ClosingContext.Provider>
  );
};
