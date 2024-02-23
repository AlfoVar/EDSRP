import axios from "./axios.js";

export const getGrocers = async () => {
  return axios.get("/grocer");
};

export const getGrocerDataById = async (grocerId) => {
  return axios.get(`/grocer/${grocerId}`);
};

export const createGrocer = async (grocerData) => {
  return axios.post("/grocer", grocerData);
};

export const updateGrocer = async (grocerId, grocerData) => {
  return axios.put(`/grocer/${grocerId}`, grocerData);
};

export const deleteGrocerData = async (grocerId) => {
  return axios.delete(`/grocer/${grocerId}`);
};