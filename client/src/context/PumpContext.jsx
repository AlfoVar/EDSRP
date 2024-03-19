import React, { useState, useEffect, createContext } from "react";
import {getPumpData, getPumpDataByDate, createPump, updatePumpData, deletePumpData} from '../api/pump';
import { useAuth } from './AuthContext';

export const PumpContext = createContext();

export const usePump = () => {
  const context = React.useContext(PumpContext);
  if (!context) {
    throw new Error("usePump must be used within a PumpProvider");
  }
  return context;
};

export const PumpContextProvider = (props) => {
  const [pumps, setPumps] = useState([]);
  
  const{ isAuthenticated } = useAuth();

  const fetchPumps = async () => {
    try {
      const response = await getPumpData();
      setPumps(response.data);
    } catch (error) {
      throw error
    }
  };

  const getPumpByDate = async (date) => {
    try {
      const response = await getPumpDataByDate(date);
      return response.data;
    } catch (error) {
      throw error
    }
  }

  const addPump = async (newPump) => {
    try {
      const response = await createPump(newPump);
      setPumps([...pumps, response.data]);
      fetchPumps();
      return response.data;
    } catch (error) {
      throw error
    }
  };

  const updatePump = async (id, updatedPump) => {
    try {
      const response = await updatePumpData(id, updatedPump);
      setPumps(
        pumps.map((pump) => (pump._id === id ? response.data : pump))
      );
    } catch (error) {
      throw error
    }
  };

  const deletePump = async (id) => {
    try {
      await deletePumpData(id);
      setPumps(pumps.filter((pump) => pump._id !== id));
    } catch (error) {
      throw error
    }
  };

  useEffect(() => {
    if(isAuthenticated) fetchPumps();
  }, [isAuthenticated]);

  return (
    <PumpContext.Provider value={{ 
      pumps, 
      getPumpByDate, 
      addPump,
      updatePump, 
      deletePump 
      }}>
      {props.children}
    </PumpContext.Provider>
  );
};

//export default PumpContextProvider;
